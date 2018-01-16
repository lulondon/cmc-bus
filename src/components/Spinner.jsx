import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const containerStyles = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  padding: '1rem'
}

const defaultErrorText = 'This usually means that there are no more departures that match this search. If you believe this is an error, please report it.'

export default class Spinner extends Component {
  showErrorText() {
    return (
      <div>
        <p>Unable to load data</p>
        <p className='text-muted'>{ this.props.errorText || defaultErrorText }</p>
      </div>
    )
  }
  componentWillReceiveProps(newProps) {
    this.setState({ newProps })
  }
  render() {
    return (
      <div style={containerStyles}>
        { this.props.error ? this.showErrorText() : <CircularProgress /> }
      </div>
    )
  }
}
