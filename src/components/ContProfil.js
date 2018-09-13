import React, { Component } from "react";
import Profil from "./Profil";
import BottomMenu from "./BottomMenu";
import MainHeader from "./MainHeader";
import RootContainer from "../styled/RootContainer";

class ContProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <RootContainer>
        <MainHeader />
        <Profil user={this.props.user} />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContProfil;
