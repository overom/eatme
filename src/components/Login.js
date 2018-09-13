import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withUser from "./withUser";

import firebase from "firebase";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  withStyles,
  ButtonBase
} from "../../node_modules/@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { SocialIcon } from "react-social-icons";
import Loader from "./Loader";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    display: "flex"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      loading: true,
      error: false
    };
    this.handleConnect = this.handleConnect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.creationUser = this.creationUser.bind(this);
  }

  creationUser(id) {
    this.setState({ id });
    const newUser = firebase
      .database()
      .ref()
      .child("user")
      .push().key;
    const updates = {};
    updates["/user/" + newUser] = this.state;
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode || errorMessage) {
          this.setState({
            error: true
          });
        }

        if (errorMessage.length) {
          toast.warn(`${errorMessage}`, {
            position: toast.POSITION.TOP_LEFT
          });
        }
        console.log("====================================");
        console.log(errorCode, errorMessage);
        console.log("====================================");
        // ...
      });

    firebase.auth().onAuthStateChanged(user => {
      const { history } = this.props;
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        // ...

        uid ? history.push(`/profil`) : console.log("pas d'id");

        console.log("====================================");
        console.log(
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData
        );
        console.log("====================================");
      } else {
        // User is signed out.
        // ...
      }
    });
  }

  handleConnect(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  signInFacebook() {
    const { id } = this.state;
    const { history } = this.props;
    const provider = new firebase.auth.FacebookAuthProvider();
    console.log("====================================");
    console.log(provider);
    console.log("====================================");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        this.setState({ id: user.uid });
        // ...
      })

      .then(() => {
        id ? history.push(`/profil`) : console.log("pas d'id");
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        if (errorMessage.length) {
          toast.warn(`${errorMessage}`, {
            position: toast.POSITION.TOP_LEFT
          });
        }
        // ...
      });
  }

  signInGoogle() {
    const { history } = this.props;
    const { id } = this.state;
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        token ? history.push(`/profil`) : console.log("Pas de user");
      })

      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log("====================================");
        console.log(errorCode, errorMessage, email, credential);
        console.log("====================================");
        if (errorMessage.length) {
          toast.warn(`${errorMessage}`, {
            position: toast.POSITION.TOP_LEFT
          });
        }
      });
  }

  componentDidMount() {
    return setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({ name: "", email: "", id: "" });
  }

  render() {
    const { classes, history, user } = this.props;
    const { showPassword, name, loading } = this.state;
    console.log("====================================");
    console.log(this.props);
    console.log("====================================");
    let valid = false;

    if (user) {
      history.push("/profil");
    }

    return (
      <div style={{ width: "100%", marginTop: 50 }}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Typography
              color="primary"
              align="center"
              style={{ marginTop: "1.6rem", marginBottom: "0.7rem" }}
              gutterBottom
              variant="headline"
              component="h2"
            >
              Connexion
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="inputUserLoginMail">Email</InputLabel>
                <Input
                  id="inputUserLoginEmail"
                  type="email"
                  name="email"
                  onChange={this.handleConnect}
                  value={this.state.email}
                />
              </FormControl>
              <FormControl
                style={{ marginBottom: "20px" }}
                className={classes.formControl}
                aria-describedby="password-helper-text"
              >
                <InputLabel htmlFor="inputUserLoginPassword">
                  Password
                </InputLabel>
                <Input
                  id="inputUserLoginPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleConnect}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickShowPassword} />
                    </InputAdornment>
                  }
                />
                <Typography
                  component="a"
                  href="/identification/rappel-de-mot-de-passe"
                  align="right"
                  variant="caption"
                  style={{ marginTop: "0.3rem", textDecoration: "none" }}
                >
                  Mot de passe oublié
                </Typography>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                color="secondary"
                className={classes.button}
                disabled={valid}
              >
                Valider
              </Button>
            </form>

            <Grid
              item
              container
              spacing={16}
              justify="center"
              style={{ marginTop: 20 }}
            >
              <Grid item xs={12}>
                <Typography
                  color="primary"
                  align="center"
                  gutterBottom
                  variant="headline"
                  component="h2"
                >
                  Connexion avec <br /> Google ou Facebook
                </Typography>
              </Grid>
              <Grid item>
                <ButtonBase
                  onClick={() => {
                    this.signInGoogle();
                  }}
                >
                  <SocialIcon
                    network="google"
                    style={{ height: 100, width: 100 }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase onClick={() => this.signInFacebook()}>
                  <SocialIcon
                    network="facebook"
                    style={{ height: 100, width: 100 }}
                  />
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* SECTION CREER UN COMPTE */}

        <Grid container justify="center">
          <Grid item xs={10}>
            <Typography
              variant="subheading"
              color="primary"
              align="center"
              style={{ marginTop: "2.6rem", marginBottom: "0.7rem" }}
            >
              Pas encore de compte ?
            </Typography>
            <Button
              variant="contained"
              fullWidth={true}
              color="primary"
              className={classes.button}
              onClick={() => history.push("/connexion/creation")}
            >
              Créer un compte
            </Button>
          </Grid>
        </Grid>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

export default withUser(withRouter(withStyles(styles)(Login)));
