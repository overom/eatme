import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../baseF';
import firebase from 'firebase';
import { AuthUserRoads } from '../routes';
import { mainRoad } from '../roads';

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AuthUserRoads {...this.props} roadTab={mainRoad()} />
      </div>
    );
  }
}

export default withRouter(App);
