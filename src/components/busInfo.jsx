import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui'
import Spinner from './Spinner'
import NextBusInfo from './NextBusInfo'

const errorText = 'Unable to load bus information. Did you enter the code correctly?'

export default class NextBus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busData: [],
      error: false,
      loading: true,
      title: this.props.title,
      subtitle: this.props.subtitle,
      stopCode: this.props.stopCode
    }
  }

  loadData() {
    let component = this
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
      }, () => {
        if (this.state.busData[0]) {
          this.setState({ adHocTitle: this.state.busData[1][1] })
        }

        const temp = []
        _.sortBy(this.state.busData, i => i[4]).map((bus, i) =>
          temp.push(<NextBusInfo bus={bus} key={i} />)
        )
        this.setState({ buses: temp })
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
    // Something strange is happening here. Fix it.
    this.setState({
      title: nextProps.title || this.state.title,
      subtitle: nextProps.subtitle || this.state.subtitle,
      stopCode: nextProps.stopCode || this.state.stopCode
    }, () => {
      this.loadData()
    })
  }

  render() {
    return (
      <Paper className='hoc'>
        <List style={{ padding: 0 }}>
          <ListItem
            primaryText={this.state.title || this.state.adHocTitle || 'Buses'}
            secondaryText={this.state.subtitle || 'Next buses calling at this stop'}
            disabled={true}
          />
          {
            this.state.loading ?
            <Spinner error={this.state.error} errorText={errorText} /> :
            this.state.buses
          }
        </List>
      </Paper>
    )
  }
}
