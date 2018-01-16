import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import NextBusInfo from './NextBusInfo';

const errorText = 'Unable to load bus information. Did you enter the code correctly?';

export default class NextBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busData: [],
      error: false,
      loading: true,
      title: this.props.title,
      subtitle: this.props.subtitle,
      stopCode: this.props.stopCode
    };
  }

  loadData() {
    let component = this; // eslint-disable-line prefer-const
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
          this.setState({ adHocTitle: this.state.busData[1][1] });
        }
      });
    })
    .catch(() => {
      this.setState({ error: true, loading: true });
    });
  }

  componentDidMount() {
    this.loadData();
    this.timer = setInterval(() => {
      this.loadData();
    }, 40000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title || this.state.title,
      subtitle: nextProps.subtitle || this.state.subtitle,
      stopCode: nextProps.stopCode || this.state.stopCode
    }, () => {
      this.loadData();
    });
  }

  render() {

    const buses = [];
    _.sortBy(this.state.busData, i => i[4]).map((bus, i) =>
      buses.push(<NextBusInfo bus={bus} key={i} />)
    );

    return (
      this.state.loading
      ? <p>Loading...</p>
      : <div className='list-group'>{buses}</div>
    );
  }
}
