import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

import Bus from './components/Bus'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#B70062'
  }
})


render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Bus />
  </MuiThemeProvider>,
  document.getElementById('root')
)