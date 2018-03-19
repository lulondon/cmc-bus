import React, { Component } from 'react'
import axios from 'axios'

import { countdownApiProxy, refreshInterval } from '../../../config/config.json'

import LiveBusDepartures from '../ui/LiveBusDepartures'

class ContainerLiveBusDepartures extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      loading: false,
      stopCode: props.stopCode
    }

    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
    const timer = setInterval(() => {
      this.loadData()
    }, refreshInterval || 30000)
    this.setState({ timer })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps, () => this.loadData())
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
        const { data } = response
        data.shift() // Remove the versioning/meta element

        component.setState({
          data: data.sort((a, b) => {
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
    const { data, loading } = this.state
    return (
      <LiveBusDepartures
        data={data}
        loading={loading}
      />
    )
  }
}

export default ContainerLiveBusDepartures
