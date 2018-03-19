import React, { Component } from 'react'

import { defaultStopCode, defaultStops } from '../../../config/config.json'

import Page from '../ui/Page'

class ContainerPage extends Component {
  constructor() {
    super()

    this.state = {
      error: false,
      errors: [],
      stopCode: defaultStopCode,
      textFieldError: null
    }

    this.handleSelectStop = this.handleSelectStop.bind(this)
    this.handleCodeEntry = this.handleCodeEntry.bind(this)
    this.handleAddError = this.handleAddError.bind(this)
    this.handleClearErrors = this.handleClearErrors.bind(this)
  }

  handleSelectStop(event) {
    document.getElementById('stopCode').value = null

    this.setState({
      textFieldError: null,
      errors: [],
      stopCode: event.target.value
    })
  }

  handleCodeEntry(event) {
    document.getElementById('nearbyStops').value = null

    const validationPattern = new RegExp('^[0-9]{5}$')
    if (validationPattern.test(event.target.value)) {
      this.setState({
        errors: [],
        stopCode: event.target.value || defaultStopCode,
        textFieldError: null
      })
    } else {
      this.setState({
        textFieldError: 'Invalid code'
      })
    }
  }

  handleAddError(error) {
    const knownErrors = {
      416: 'Bus stop code not recognised.'
    }

    const errorString = error.response
      ? knownErrors[error.response.status]
      : String(error)

    this.setState({ errors: this.state.errors.concat(errorString) })
  }

  handleClearErrors() {
    this.setState({ errors: [] })
  }

  render() {
    return (
      <Page
        defaultStops={defaultStops}
        defaultStopCode={defaultStopCode}
        errors={this.state.errors}
        handleAddError={this.handleAddError}
        handleClearErrors={this.handleClearErrors}
        handleCodeEntry={this.handleCodeEntry}
        handleSelectStop={this.handleSelectStop}
        stopCode={this.state.stopCode}
        textFieldError={this.state.textFieldError}
      />
    )
  }
}

export default ContainerPage
