/* eslint-disable max-len */
import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

const style = { }

export default class NextBusInfo extends Component {
  render() {
    if (this.props.bus[0] === 4) {
      return null
    } else {
      return (
        <div className='list-group-item d-flex'>
          <p className='p-2 m-0' style={style}>{this.props.bus[2]}&nbsp;</p>
          <p className='p-2 m-0' style={style}>{this.props.bus[3]}</p>
          <p className='ml-auto p-2 m-0' style={style}>
            {Math.round(((Math.abs(new Date(this.props.bus[4] - Date.now())) % 86400000) % 3600000) / 60000)}&nbsp;mins
          </p>
        </div>
      )
    }
  }
}
