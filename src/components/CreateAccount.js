import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  withStyles,
  Button
} from "../../node_modules/@material-ui/core";
import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import { withRouter } from "react-router-dom";

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

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      email: "",
      password: "",
      name: "",
      error: false,
      id: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const { history } = this.props;

    const { email, password, name } = this.state;
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;

        if (user) {
          user
            .updateProfile({
              displayName: name
            })
            .then(this.creationUser(user.uid))
            .then(() => {
              if (this.state.error) {
                history.push("/profil");
              }
              // Update successful.
            })
            .then(error => {
              console.log("====================================");
              console.log(error);
              console.log("====================================");
              // An error happened.
            });
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode || errorMessage) {
          this.setState({ error: true });
        }
        if (errorMessage.length) {
          toast.warn(`${errorMessage}`, {
            position: toast.POSITION.TOP_LEFT
          });
        }
        console.log("====================================");
        console.log(errorCode, errorMessage);
        console.log("====================================");
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;

    let errorName = "";
    let errorEmail = "";

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper
              style={{ padding: "1.6rem 1rem 2rem 1rem", marginTop: "3rem" }}
            >
              <form
                onChange={this.handleChange}
                onBlur={this.handleCheckEmail}
                onSubmit={this.handleSubmit}
              >
                <Typography variant="subheading" color="primary" align="center">
                  Creer votre compte Eat Me
                </Typography>
                <FormControl
                  error={errorName.length}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="name">Nom</InputLabel>
                  <Input
                    id="userSignUpName"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl
                  error={errorName.length}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="userSignUpEmail"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl
                  error={errorEmail.length}
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <Input
                    id="userSignUpPassword"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  fullWidth={true}
                  color="secondary"
                  className={classes.button}
                  type="submit"
                  disabled={this.state.condition}
                >
                  Valider
                </Button>
              </form>
            </Paper>
            <ToastContainer autoClose={5000} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CreateAccount));
