import React, { Component } from "react";
import firebase from "firebase";

// import PropTypes from "prop-types";

const withUser = ComponentToWrap => {
  class DataProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      };
      this.checkUserLogged = this.checkUserLogged.bind(this);
    }

    componentDidMount() {
      this.checkUserLogged();
    }

    checkUserLogged() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ user });
        }
      });
    }

    render() {
      console.log("========...this.state=====================");
      console.log({ ...this.state });
      console.log("====================================");
      return <ComponentToWrap {...this.props} {...this.state} />;
    }
  }

  return DataProvider;
};

export default withUser;
