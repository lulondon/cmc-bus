import React, { Component } from 'react'

class Bus extends Component {
  render() {
    const {
      data,
      defaultStops,
      errors,
      handleCodeEntry,
      handleSelectStop,
      loading,
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
                        <select className='form-control' id='nearbyStops' defaultValue={91431} onChange={handleSelectStop}>
                          {defaultStops}
                        </select>
                      </div>
                      <div className='form-group col-lg col-xs-12'>
                        <label htmlFor='stopCode'>5-digit bus stop code</label>
                        <input className='form-control' type='text' id='stopCode' placeholder={`ex. ${stopCode || 91432}`} onChange={handleCodeEntry}></input>
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
                      ? <LiveBusDepartures
                          data={data}
                          loading={loading}
                        />
                      : null
                  }
                </div>
            }
          </div>
        </div>
    )
  }
}

class LiveBusDepartures extends Component {
  render() {
    const { data, loading } = this.props

    return (
      <div className='list-group'>
        <div className='list-group-item m-0 p-4 pb-0 bus-info-header'>
          <h3>{data[0] ? data[0][1] : 'Live Bus Departures'}</h3>
          <p className='bus-header-subtitle mb-0'>Next buses to depart from this stop.</p>
        </div>
          {
            loading
                ? <div className='p-0 list-group-item loader' />
                : <div className='p-0 list-group-item loader-padding' />
          }
          {data.map(bus => <BusInfo bus={bus} key={bus[4]} />)}
        <div className='list-group-item bus-attribution-footer px-4'>Powered by TfL Open Data</div>
      </div>
    )
  }
}

class BusInfo extends Component {
  render() {
    const routeInfoClasses = ['pl-2', 'py-2', 'm-0', 'lead', 'bus-info-col']
    const { bus } = this.props

    if (bus[0] === 4) {
      return null
    } else {
      return (
        <div className='list-group-item d-flex'>
          <p className={routeInfoClasses.concat(['text-secondary']).join(' ')}>{bus[2]}</p>
          <p className={routeInfoClasses.join(' ')}>{bus[3]}</p>
          <p className='p-2 m-0 ml-auto bus-info-col'>
            {
              Math.round(((
                Math.abs(new Date(bus[4] - Date.now())) % 86400000) % 3600000) / 60000)
            }
            &nbsp;mins
          </p>
        </div>
      )
    }
  }
}

export default Bus
