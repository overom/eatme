import React, { Component } from "react";
import MainHeader from "./MainHeader";
import BottomMenu from "./BottomMenu";

import RootContainer from "../styled/RootContainer";
import CreateAccount from "./CreateAccount";

class ContFavoris extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <RootContainer>
        <MainHeader />
        <CreateAccount />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContFavoris;
