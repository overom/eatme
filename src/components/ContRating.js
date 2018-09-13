import React, { Component } from "react";
import BottomMenu from "./BottomMenu";
import MainHeader from "./MainHeader";
import RatingPlat from "./RatingPlat";
import RootContainer from "../styled/RootContainer";

class ContRating extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <RootContainer>
        <MainHeader />
        <RatingPlat />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContRating;
