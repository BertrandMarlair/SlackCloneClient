import React from 'react'

import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import RouteProvider from './RouteProvider'
import { ENDPOINT_HTTP } from '../../utils/Constant/constant'

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

    const link = afterwareLink.concat(middlewareLink.concat(httpLink))

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
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
