import React, { Component } from "react";
import MainHeader from "./MainHeader";
import Login from "./Login";
import BottomMenu from "./BottomMenu";
import RootContainer from "../styled/RootContainer";

class ContLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", name: "", id: "" };
    this.userConnect = this.userConnect.bind(this);
  }

  userConnect(email, name, id) {
    if (!this.state.email) {
      this.setState({ email, name, id });
    }
  }

  render() {
    return (
      <RootContainer>
        <MainHeader />
        <Login />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContLogin;
