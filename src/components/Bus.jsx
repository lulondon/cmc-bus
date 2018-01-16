import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'

import NextBus from './NextBus'

const defaultStops = [
  { label: 'HereEast (towards London)', code: 91432 },
  { label: 'HereEast (towards Stratford)', code: 91431 }
]

export default class Bus extends Component {
  constructor() {
    super()
    const temp = []

    defaultStops.map((stop, i) => {
      temp.push(<MenuItem key={i} value={stop.code} primaryText={stop.label} />)
      return null
    })

    this.state = {
      TextFieldError: null,
      nearbyStops: temp
    }

    this.handleSelectStop = this.handleSelectStop.bind(this)
    this.handleCodeEntry = this.handleCodeEntry.bind(this)
  }

  handleSelectStop(event, index, value) {
    this.setState({
      TextFieldError: null,
      stopCode: value
    })
  }

  handleCodeEntry(event) {
    const stopCode = event.target.value
    const validationPattern = new RegExp('^[0-9]{5}$')
    if (!stopCode) {
      this.setState({
        stopCode: null,
        TextFieldError: null
      })
    } else if (validationPattern.test(stopCode)) {
      this.setState({
        stopCode,
        TextFieldError: null
      })
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-4 offset-lg-1 col-md-5'>
            <Card style={{ marginBottom: '2rem' }}>
              <CardHeader
                title='Next buses'
                subtitle='Select from nearby stops, or enter the 5-digit code for a London bus stop to see the next buses to call there.'
              />
              <CardText>
                <SelectField
                  children={this.state.nearbyStops}
                  onChange={this.handleSelectStop}
                  floatingLabelText='Bus stops near campus'
                  fullWidth={true}
                  value={this.state.stopCode}
                />
                <TextField
                  floatingLabelText="Bus stop code"
                  errorText={this.state.TextFieldError}
                  onChange={this.handleCodeEntry}
                  fullWidth={true}
                />
              </CardText>
            </Card>
          </div>
          <div className='col-md-7 col-lg-6'>
            { this.state.stopCode ? <NextBus stopCode={this.state.stopCode} /> : null }
          </div>
        </div>
      </div>
    )
  }
}
