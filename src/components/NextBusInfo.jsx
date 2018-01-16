/* eslint-disable max-len */
import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

export default class NextBusInfo extends Component {
  render() {
    if (this.props.bus[0] === 4) {
      return null
    } else {
      return (
          <ListItem
            disabled={true}
          >
            <div className="d-flex w-100 justify-content-start">
              <p style={{ fontWeight: 600 }}>{this.props.bus[2]}&nbsp;</p>
              <p className="mb-1">{this.props.bus[3]}</p>
              <small className="ml-auto">
                {Math.round(((Math.abs(new Date(this.props.bus[4] - Date.now())) % 86400000) % 3600000) / 60000)}&nbsp;mins
              </small>
            </div>
          </ListItem>
      )
    }
  }
}
