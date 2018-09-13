import React, { Component } from "react";
import MainHeader from "./MainHeader";
import BottomMenu from "./BottomMenu";
import FavorisList from "./FavorisList";
import RootContainer from "../styled/RootContainer";

class ContFavoris extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <RootContainer>
        <MainHeader />
        <FavorisList />
        <BottomMenu />
      </RootContainer>
    );
  }
}

export default ContFavoris;
