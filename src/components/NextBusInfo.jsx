/* eslint-disable max-len */
import React, { Component } from 'react'

export default class NextBusInfo extends Component {
  render() {
    const routeInfoClasses = ['pl-2', 'py-2', 'm-0', 'lead', 'bus-info-col']

    if (this.props.bus[0] === 4) {
      return null
    } else {
      return (
        <div className='list-group-item d-flex'>
          <p className={routeInfoClasses.concat(['text-secondary']).join(' ')}>{this.props.bus[2]}</p>
          <p className={routeInfoClasses.join(' ')}>{this.props.bus[3]}</p>
          <p className='p-2 m-0 ml-auto bus-info-col'>
            {Math.round(((Math.abs(new Date(this.props.bus[4] - Date.now())) % 86400000) % 3600000) / 60000)}&nbsp;mins
          </p>
        </div>
      )
    }
  }
}
