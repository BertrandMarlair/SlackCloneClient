import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import RouteProvider from './RouteProvider'
import { ENDPOINT_HTTP } from '../../utils/Constant/constant'

const AppoloProvider = () => {

    const client = new ApolloClient({
        uri: ENDPOINT_HTTP,
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
