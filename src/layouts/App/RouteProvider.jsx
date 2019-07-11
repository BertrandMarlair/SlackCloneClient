import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import dashboard from '../../router/routerPath/dashboard'
import connect from '../../router/routerPath/connect'
import all from '../../router/routerPath/public'
import PrivateRoute from '../../router/routerContainer/PrivateRoute'
import PublicRoute from '../../router/routerContainer/PublicRoute'
import ConnectRoute from '../../router/routerContainer/ConnectRoute'
import DynamicRoute from '../../router/routerContainer/DynamicRoute'

// const api = [
//     {
//         id: 'azeazesdfshk',
//         name: 'Group 1',
//         menu: {
//             id: 'kbcjjxwkvhnlskehj',
//             icon: 'plane',
//             name: 'Menu 1',
//             menuItem: [
//                 {
//                     id: 'xcjkbxwucyvbdskfh',
//                     name: 'Menu Item 1',
//                     icon: 'star',
//                     path: '/route1',
//                     component: 'GridSystem',
//                     layout: {
//                         cols: 12,
//                         rowHeight: 30
//                     },
//                     grid: [
//                         { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
//                         { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//                         { i: 'c', x: 4, y: 0, w: 1, h: 2 }
//                     ]
//                 }
//             ]
//         }
//     }
// ]

const routesFromApi = [
    {
        component: 'GridSystem', 
        id: 'xcjkbxwucyvbdskfh', 
        path: '/route1', 
        layout: {
            cols: 12,
            rowHeight: 30
        },
        grid: [
            { 
                id: 'aqsdqsdqsd', 
                component: 'jesaispas', 
                headerTitle: 'grid item 1',
                itemDisplayParams: {
                    x: 0, y: 0, w: 8, h: 5, static: true
                }
            },
            { 
                id: 'bsdfsdf', 
                component: 'jesaispas', 
                headerTitle: 'grid item 2',
                itemDisplayParams: {
                    x: 8, y: 0, w: 4, h: 10, minW: 2, maxW: 4
                }
            },
            { 
                id: 'cksdjcnsl', 
                component: 'jesaispas', 
                headerTitle: 'grid item 3',
                itemDisplayParams: {
                    x: 0, y: 5, w: 5, h: 2
                }
            },
        ],
    },
    {
        component: 'Lorem',
        id: 'qskdnqjkhdsdfs',
        path: '/lorem',
    }
]

// const menusFromApi = [
//     {
//         id: 'azeazesdfshk',
//         name: 'Group 1',
//         menu: {
//             id: 'kbcjjxwkvhnlskehj',
//             icon: 'plane',
//             name: 'Menu 1',
//             menuItem: [
//                 {
//                     id: 'xcjkbxwucyvbdskfh',
//                     name: 'Menu Item 1',
//                     icon: 'star',
//                     path: '/route1',
//                     component: 'GridSystem',
//                 }
//             ]
//         }
//     }
// ]

const RouteProvider = () => {
    return (
        <Router>
            {routesFromApi.map(params => {
                return <DynamicRoute {...params} key={params.id} />
            })}
            {dashboard.map(({ component, name, path, exact }) => {
                return <PrivateRoute path={path} component={component} key={name} exact={exact} />
            })}
            {connect.map(({ component, name, path, exact }) => {
                return <ConnectRoute path={path} component={component} key={name} exact={exact} />
            })}
            {all.map(({ component, name, path, exact }) => {
                return <PublicRoute path={path} component={component} key={name} exact={exact} />
            })}
        </Router>
    )
}

export default RouteProvider