import React from "react";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: theme,
    height: "10%"
  }
});

class BottomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selection: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    console.log("====================================");
    console.log(event);
    console.log("====================================");
    this.setState({ value, selection: true });
  };

  render() {
    const { classes, history } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Manger"
          value="restaurant"
          icon={<Icon style={{ fontSize: "40px" }}>restaurant</Icon>}
          onClick={() => history.push("/")}
        />

        <BottomNavigationAction
          label="Partager"
          value="partager"
          icon={<Icon style={{ fontSize: "40px" }}>add_circle_outline</Icon>}
          onClick={() => history.push("/note")}
        />

        <BottomNavigationAction
          label="Favoris"
          value="favoris"
          icon={<Icon style={{ fontSize: "40px" }}>star_border</Icon>}
          onClick={() => history.push("/favoris")}
        />

        <BottomNavigationAction
          label="Profil"
          value="profil"
          icon={<Icon style={{ fontSize: "40px" }}>perm_identity</Icon>}
          onClick={() => history.push("/connexion")}
        />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomMenu));
