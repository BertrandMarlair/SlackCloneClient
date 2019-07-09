import React from 'react'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import introspectionQueryResultData from '../../utils/Constant/fragmentTypes.json'

import RouteProvider from './RouteProvider'
import { ENDPOINT_HTTP, ENDPOINT_WS } from '../../utils/Constant/constant'
import { WebSocketLink } from 'apollo-link-ws'

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
})

const AppoloProvider = () => {

    const httpLink = createHttpLink({ uri: ENDPOINT_HTTP })

    const middlewareLink = setContext(() => ({
        headers: {
            'x-token': localStorage.getItem('token'),
            'x-refresh-token': localStorage.getItem('refreshToken'),
        },
    }))

    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            const context = operation.getContext()
            const { response: { headers } } = context
            if (headers) {
                const token = headers.get('x-token')
                const refreshToken = headers.get('x-refresh-token')
                if (token) localStorage.setItem('token', `Bearer ${token}`)
                if (refreshToken) localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
            }
            return response
        })
    })

    const httpLinkAuth = afterwareLink.concat(middlewareLink.concat(httpLink))

    const wsLink = new WebSocketLink({
        uri: ENDPOINT_WS,
        options: {
            reconnect: true,
            connectionParams: {
                token: localStorage.getItem('token'),
                refreshToken: localStorage.getItem('refreshToken'),
            },
        },
    })

    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query)
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLinkAuth,
    )

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache({ fragmentMatcher })
    })

    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <RouteProvider />
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

export default AppoloProvider