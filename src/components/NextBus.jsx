import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import NextBusInfo from './NextBusInfo'

export default class NextBus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busData: [],
      error: false,
      loading: true,
      stopCode: this.props.stopCode
    }
  }

  loadData() {
    let component = this // eslint-disable-line prefer-const
    axios.get('http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1', {
      params: {
        StopCode1: this.state.stopCode,
        ReturnList: 'EstimatedTime,LineID,DestinationName,StopPointName'
      }
    })
      .then((response) => {
        component.setState({
          busData: JSON.parse(`[${response.data.replace(/]/g, '],').replace(/\],$/, ']').toString()}]`),
          loading: false
        })
      })
      .catch(() => {
        this.setState({ error: true, loading: true })
      })
  }

  componentDidMount() {
    this.loadData()
    this.timer = setInterval(() => {
      this.loadData()
    }, 40000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title || this.state.title,
      subtitle: nextProps.subtitle || this.state.subtitle,
      stopCode: nextProps.stopCode || this.state.stopCode
    }, () => {
      this.loadData()
    })
  }

  render() {
    const buses = []
    _.sortBy(this.state.busData, i => i[4]).map((bus, i) =>
      buses.push(<NextBusInfo bus={bus} key={i} />))

    return (
      this.state.loading
        ? <div className='spinner'><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>
        : <div className='list-group'>
            <div className='list-group-item m-0 p-4 pb-0 bus-info-header'>
              <h3>{this.state.busData[1][1]}</h3>
              <p className='bus-header-subtitle mb-0'>Next buses to depart from this stop.</p>
            </div>
            {buses}
            <div className='list-group-item bus-attribution-footer px-4'>Powered by TfL Open Data</div>
          </div>
    )
  }
}
