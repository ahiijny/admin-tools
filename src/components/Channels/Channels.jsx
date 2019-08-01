import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Spinner from '../Shared/Loader';
import { Card, CardHeader } from '../Shared/Card';
import { Input, InputLabel } from '../Shared/Input';
import { Button } from '../Shared/Button';
import Controller from './ChannelsController.js';
import './Channels.css';

class Channels extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      channels: [],
      loading: true
    };
  }

  async componentDidMount() {
    const response = await Controller.getChannels(localStorage.getItem('token'));
    this.setState({
      loading: false,
      channels: response
    });
  }

  getChannelList = () => {
    let channelList = [];

    this.state.channels.forEach((channel) => {
      channelList.push(
        <div className="channel-card" key={channel.name}>
          <div className="title">
            {channel.name}
          </div>
          <div className="description">
            {channel.description}
          </div>
          <div className="action-cell">
            <div className="action">
              Edit
            </div>
            <div className="action">
              Delete
            </div>
          </div>
        </div>
      )
    });

    return channelList;
  }

  render() {
    return !localStorage.getItem('token') ? <Redirect to='/login'/> :
    (
      <div className='channels'>
        <Card>
          <CardHeader>
            Channel List
          </CardHeader>

          <InputLabel>Search</InputLabel>
          <Input/>

          <div className="channel-list">
            <div className="channel-card list-header">
              <div className="title">
                Title
              </div>
              <div className="title">
                Description
              </div>
              <div className="action-cell"/>
            </div>
            <Spinner loading={this.state.loading}/>
            {this.getChannelList()}
          </div>
          
          <Button primary width='150px'>Create</Button>
        </Card>
      </div>
    );
  }
}

export default withRouter(Channels);