import React, { Component } from "react";
import firebase from "firebase";
import Loader from "./Loader";
import PlatList from "./PlatList";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      plat: {}
    };
  }
  componentDidMount() {
    const plat = firebase.database().ref("plat");
    plat.on("value", snapshot => {
      this.setState({
        plat: snapshot.val(),
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return <PlatList />;
    }
  }
}

export default MainPage;
