/* eslint-disable max-len */
import React, { Component } from 'react'

const routeNumberStyle = { fontWeight: 'bold' }

export default class NextBusInfo extends Component {
  render() {
    if (this.props.bus[0] === 4) {
      return null
    } else {
      return (
        <div className='list-group-item d-flex'>
          <p className='bus-info-col p-2 m-0 lead' style={routeNumberStyle}>{this.props.bus[2]}</p>
          <p className='bus-info-col p-2 m-0 lead'>{this.props.bus[3]}</p>
          <p className='bus-info-col ml-auto p-2 m-0'>
            {Math.round(((Math.abs(new Date(this.props.bus[4] - Date.now())) % 86400000) % 3600000) / 60000)}&nbsp;mins
          </p>
        </div>
      )
    }
  }
}
