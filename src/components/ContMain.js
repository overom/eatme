import React, { Component } from "react";
import MainHeader from "./MainHeader";
import BottomMenu from "./BottomMenu";
import MainPage from "./MainPage";
import RootContainer from "../styled/RootContainer";

class ContMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("===========contmain=========================");
    console.log(this.props);
    console.log("====================================");
    return (
      <RootContainer>
        <MainHeader />
        <MainPage />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContMain;
