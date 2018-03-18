import React, { Component } from 'react'
import axios from 'axios'

import { countdownApiProxy } from '../../../config/config.json'

import Bus from '../ui/Bus'

const defaultStops = [
  <option value={null} key={0}>&nbsp;</option>,
  <option value={91431} key={91431}>HereEast (towards Stratford)</option>,
  <option value={91432} key={91432}>HereEast (towards London)</option>
]

class ContainerBus extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      error: false,
      errors: [],
      loading: true,
      stopCode: 91431,
      textFieldError: null
    }

    this.handleSelectStop = this.handleSelectStop.bind(this)
    this.handleCodeEntry = this.handleCodeEntry.bind(this)
    this.handleAddError = this.handleAddError.bind(this)
    this.handleClearErrors = this.handleClearErrors.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
    const timer = setInterval(() => {
      this.loadData()
    }, 10000)
    this.setState({ timer })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  handleSelectStop(event) {
    document.getElementById('stopCode').value = null

    this.setState({
      textFieldError: null,
      errors: [],
      stopCode: event.target.value
    }, () => this.loadData())
  }

  handleCodeEntry(event) {
    document.getElementById('nearbyStops').value = null

    const validationPattern = new RegExp('^[0-9]{5}$')
    if (validationPattern.test(event.target.value)) {
      this.setState({
        errors: [],
        stopCode: event.target.value,
        textFieldError: null
      }, () => this.loadData())
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

  loadData() {
    let component = this // eslint-disable-line prefer-const

    const { stopCode } = this.state

    this.setState({ loading: true })

    axios.post(`${countdownApiProxy}/${stopCode}`, {
      options: {
        ReturnList: 'EstimatedTime,LineID,DestinationName,StopPointName'
      }
    })
      .then((response) => {
        component.setState({
          data: response.data.splice(-1).sort((a, b) => {
            const x = a[5]
            const y = b[5]
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) // eslint-disable-line no-nested-ternary
          }),
          loading: false
        })
      })
      .catch((err) => {
        this.handleAddError(err)
        this.setState({ error: true, loading: false })
      })
  }

  render() {
    return (
      <Bus
        data={this.state.data}
        defaultStops={defaultStops}
        errors={this.state.errors}
        handleAddError={this.handleAddError}
        handleClearErrors={this.handleClearErrors}
        handleCodeEntry={this.handleCodeEntry}
        handleSelectStop={this.handleSelectStop}
        loading={this.state.loading}
        stopCode={this.state.stopCode}
        textFieldError={this.state.textFieldError}
      />
    )
  }
}

export default ContainerBus
