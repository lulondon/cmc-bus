import React, { Component } from 'react'

import LiveBusDepartures from '../containers/LiveBusDepartures'

class Page extends Component {
  render() {
    const {
      defaultStops,
      defaultStopCode,
      errors,
      handleCodeEntry,
      handleSelectStop,
      stopCode,
      textFieldError
    } = this.props

    return (
      <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-lg-6 offset-lg-3'>
              <div className='jumbotron jumbotron-fluid'>
                <div className='container'>
                  <h1 className='display-4'>London Bus Information</h1>
                  <h3>Live departure boards for London bus stops.</h3>
                  <p>Select from nearby stops, or enter the 5-digit code for a London bus stop to
                   view the next departures.</p>
                  <p className='text-secondary'>We are unable to provide times for the HereEast shuttle bus service.</p>
                  <form>
                    <div className='form-row'>
                      <div className='form-group col-lg col-xs-12'>
                        <label htmlFor='nearbyStops'>Bus stops near campus</label>
                        <select className='form-control' id='nearbyStops' defaultValue={defaultStopCode} onChange={handleSelectStop}>
                          {defaultStops.map(stop =>
                            <option value={stop.code} key={stop.code}>{stop.label}</option>)}
                        </select>
                      </div>
                      <div className='form-group col-lg col-xs-12'>
                        <label htmlFor='stopCode'>5-digit bus stop code</label>
                        <input className='form-control' type='text' id='stopCode' placeholder={`ex. ${stopCode || defaultStopCode}`} onChange={handleCodeEntry}></input>
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
                textFieldError
                ? <div className='alert alert-warning'><strong>Warning&nbsp;</strong>{textFieldError}</div>
                : null
              }
            </div>
          </div>
          <div className='row'>
            {
              errors.length > 0
              ? <div className='col-xs-12 col-lg-6 offset-lg-3'>
                  {errors.map((error, i) => <p className='alert alert-danger' key={i}>{error}</p>)}
                </div>
              : <div className='col-xs-12 col-lg-6 offset-lg-3'>
                  {
                    stopCode
                      ? <LiveBusDepartures stopCode={stopCode} />
                      : null
                  }
                </div>
            }
          </div>
        </div>
    )
  }
}

export default Page
