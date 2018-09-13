import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  Grid
} from "../../node_modules/@material-ui/core";
import firebase from "firebase";
import deconnexion from "../assets/img/deconnexion.jpg";
import avatar from "../assets/img/avatar.jpg";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  up: {
    position: "absolute",
    top: 100
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = { connect: true, loading: true, displayName: "" };
    this.deconnexion = this.deconnexion.bind(this);
    this.bonjour = this.bonjour.bind(this);
  }

  deconnexion() {
    const { history } = this.props;
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Signed Out");
          this.setState({ connect: false });
          history.push("/connexion");
        },
        error => {
          console.error("Sign Out Error", error);
        }
      );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  bonjour(user) {
    if (user) {
      toast.success(`Bonjour ${user.displayName}`, {
        position: toast.POSITION.TOP_LEFT
      });
    }
  }

  render() {
    const { classes, user, history } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    if (user) {
      this.bonjour(user);
    }
    return user ? (
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={user.photoURL ? user.photoURL : avatar}
            title="Photo de profil"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {user.displayName}
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
          <Button color="primary" onClick={this.deconnexion}>
            Deconnexion
          </Button>
          <ToastContainer autoClose={5000} />
        </Card>
      </Grid>
    ) : (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.up}
      >
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={deconnexion}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Vous n'êtes pas connecté
            </Typography>
            <Typography component="p">
              Vous devez être connecté pour avoir accès à votre profil.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              onClick={() => history.push("/connexion")}
            >
              Connexion
            </Button>
          </CardActions>
        </Card>
        <ToastContainer autoClose={5000} />
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Profil));
