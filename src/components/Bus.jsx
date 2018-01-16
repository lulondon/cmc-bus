import React, { Component } from 'react'

import NextBus from './NextBus'

const defaultStops = [
  <option value={91432} key={0}>HereEast (towards London)</option>,
  <option value={91431} key={1}>HereEast (towards Stratford)</option>
]

export default class Bus extends Component {
  constructor() {
    super()
    const temp = []

    this.state = {
      stopCode: 91431,
      textFieldError: null
    }

    this.handleSelectStop = this.handleSelectStop.bind(this)
    this.handleCodeEntry = this.handleCodeEntry.bind(this)
  }

  handleSelectStop(event) {
    this.setState({
      textFieldError: null,
      stopCode: event.target.value
    })
  }

  handleCodeEntry(event) {
    const stopCode = event.target.value
    const validationPattern = new RegExp('^[0-9]{5}$')
    if (!stopCode) {
      this.setState({
        stopCode: null,
        textFieldError: ''
      })
    } else if (validationPattern.test(stopCode)) {
      this.setState({
        stopCode,
        textFieldError: null
      })
    } else {
      this.setState({
        textFieldError: 'Invalid code'
      })
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            <div className='jumbotron jumbotron-fluid'>
              <div className='container'>
                <h1 className='display-4'>London Bus Information</h1>
                <p className='lead'>Select from nearby stops, or enter the 5-digit code for a London bus stop to see the next buses to call there.</p>
                <p className='text-muted'>We are unable to provide times for the HereEast shuttle bus service.</p>
                <form>
                  <div className='form-row'>
                    <div className='form-group col-lg col-xs-12'>
                      <label htmlFor='nearbyStops'>Bus stops near campus</label>
                      <select className='form-control' id='nearbyStops' onChange={this.handleSelectStop}>
                        {defaultStops}
                      </select>
                    </div>
                    <div className='form-group col-lg col-xs-12'>
                      <label htmlFor='stopCode'>5-digit bus stop code</label>
                      <input className='form-control' type='text' id='stopCode' placeholder={`ex. ${this.state.stopCode || 91432}`} onChange={this.handleCodeEntry}></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            {
              this.state.textFieldError
              ? <div className='alert alert-danger'>{this.state.textFieldError}</div>
              : null
            }
          </div>
        </div> 
        <div className='row'>
          <div className='col-xs-12 col-lg-6 offset-lg-3'>
            { this.state.stopCode ? <NextBus stopCode={this.state.stopCode} /> : null }
          </div>
        </div>
      </div>
    )
  }
}
