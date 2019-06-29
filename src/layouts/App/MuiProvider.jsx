import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'

import RouteProvider from './RouteProvider'
import { theme } from '../../utils/theme/theme'

const MuiProvider = () =>(
	<MuiThemeProvider theme={theme}>
		<RouteProvider />
	</MuiThemeProvider>
)

export default MuiProvider