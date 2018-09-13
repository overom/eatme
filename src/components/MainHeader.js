import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Grid, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import withUser from "./withUser";
import avatar from "../assets/img/avatar.jpg";

const styles = theme => ({
  root: {
    flexGrow: 0.5
  },
  flex: {
    flexGrow: 1
  },
  font: {
    fontFamily: "Kirang Haerang",
    fontSize: 35
  },
  row: {
    display: "flex",
    justifyContent: "center"
  }
});

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, history, user } = this.props;
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    return user ? (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Grid
              container
              spacing={24}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <IconButton color="inherit" aria-label="Retour">
                  <Icon
                    style={{ fontSize: 50, marginLeft: 20, marginRight: 0 }}
                  >
                    keyboard_arrow_left
                  </Icon>
                  <Typography
                    color="inherit"
                    style={{ fontSize: 20, marginLeft: -10, zIndex: 1000 }}
                    onClick={() => history.goBack()}
                  >
                    Retour
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography color="secondary" className={classes.font}>
                  Eat Me
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ textAlign: "center" }}>
                <div className={classes.row}>
                  <Avatar
                    alt="Votre photo de profil"
                    src={user.photoURL ? user.photoURL : avatar}
                    onClick={() => history.push("/profil")}
                  />
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    ) : (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Grid container alignItems="center" direction="row">
              <Grid item xs={3}>
                <IconButton color="inherit" aria-label="Retour">
                  <Icon
                    style={{ fontSize: 50, marginLeft: 20, marginRight: 0 }}
                  >
                    keyboard_arrow_left
                  </Icon>
                  <Typography
                    color="inherit"
                    style={{ fontSize: 20, marginLeft: -10, zIndex: 1000 }}
                    onClick={() => history.goBack()}
                  >
                    Retour
                  </Typography>
                </IconButton>
              </Grid>

              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography color="secondary" className={classes.font}>
                  Eat Me
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withUser(withRouter(withStyles(styles)(MainHeader)));
