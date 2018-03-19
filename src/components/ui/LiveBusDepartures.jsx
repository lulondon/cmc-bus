import React, { Component } from 'react'

import BusInfo from './BusInfo'

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
                ? <div className='p-0 loader' />
                : <div className='p-0 loader-padding' />
          }
          {data.map(bus => <BusInfo bus={bus} key={bus[4]} />)}
        <div className='list-group-item bus-attribution-footer px-4'>Powered by TfL Open Data</div>
      </div>
    )
  }
}

export default LiveBusDepartures
