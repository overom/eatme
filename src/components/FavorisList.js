import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import firebase from "firebase";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import deconnexion from "../assets/img/deconnexion.jpg";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Collapse from "@material-ui/core/Collapse";
import CardHeader from "@material-ui/core/CardHeader";
import classnames from "classnames";

import withUser from "./withUser";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  Grid,
  Avatar,
  IconButton
} from "../../node_modules/@material-ui/core";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },

  up: {
    position: "absolute",
    top: 100
  },
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: 400,
    marginTop: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  bonneNote: {
    backgroundColor: theme.palette.secondary.main
  },
  mauvaiseNote: {
    backgroundColor: theme.palette.primary.main
  }
});

class FavorisList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      plat: {},
      loading: true,
      theGoodUser: {},
      firebaseUser: {},
      expanded: false
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    const plat = firebase.database().ref("plat");
    plat.on("value", snapshot => {
      this.setState({
        plat: snapshot.val(),
        loading: false
      });
    });
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ firebaseUser: user });
    });
    const user = firebase.database().ref("user");
    user.on("value", snapshot => {
      this.setState({
        testUser: "Romain",
        testDate: "01/08/2018",
        user: snapshot.val(),
        loading: false
      });
    });
  }

  Capitalize(phrase) {
    return phrase
      .split(" ")
      .map(elt => {
        return elt.replace(elt[0], elt.split("")[0].toUpperCase());
      })
      .join(" ");
  }

  removeMajFavoris(key) {
    const { user } = this.state;
    const currentUser = firebase.auth().currentUser.uid;
    Object.keys(user).map(clef => {
      const rechercheUser = user[clef].id === currentUser;
      if (rechercheUser) {
        const userBDD = firebase.database().ref(`user/${clef}/favoris/${key}`);
        userBDD
          .remove()
          .then(() => {
            console.log("Remove succeeded.");
          })
          .catch(error => {
            console.log("Remove failed: " + error.message);
          });
      }
    });
  }

  removeToFavoris(e, key) {
    const currentUser = firebase.auth().currentUser.uid;
    const plat = this.state.plat[key];
    const platBDD = firebase
      .database()
      .ref(`plat/${key}/favorisProduct/${currentUser}`);
    platBDD
      .remove()
      .then(() => {
        console.log("Remove succeeded.");
      })
      .catch(error => {
        console.log("Remove failed: " + error.message);
      });
    this.removeMajFavoris(key);
  }

  UsersFavoris() {
    const currentUser = this.props.user;
    const { user } = this.state;
    const { classes, history } = this.props;
    console.log("coucou");
    return (
      currentUser &&
      user &&
      Object.keys(user).map((keyUser, i) => {
        console.log("====================================");
        console.log(user[keyUser]);
        console.log("====================================");

        if (currentUser.uid === user[keyUser].id && user[keyUser].favoris) {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                overflow: "hidden",
                marginTop: "55px",
                marginBottom: "60px"
              }}
            >
              <Typography
                color="secondary"
                variant="display3"
                style={{ textAlign: "center" }}
              >
                Favoris
              </Typography>
              {Object.keys(user[keyUser].favoris).map(
                (elt, i) =>
                  user[keyUser].favoris[elt].plat ? (
                    <Card className={classes.card} key={i}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="Recipe"
                            className={
                              `${user[keyUser].favoris[elt].plat.note}` > 5
                                ? `${classes.bonneNote}`
                                : `${classes.mauvaiseNote}`
                            }
                          >
                            {user[keyUser].favoris[elt].plat.note}
                          </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={`${this.Capitalize(
                          user[keyUser].favoris[elt].plat.nom
                        )} chez : ${this.Capitalize(
                          user[keyUser].favoris[elt].plat.restaurant
                        )}`}
                        subheader={`Ajouté au favoris le : ${
                          user[keyUser].favoris[elt].date
                        }`}
                      />
                      <CardMedia
                        className={classes.media}
                        image={user[keyUser].favoris[elt].plat.photoDuPlat}
                        title="Photo du plat"
                      />
                      <CardContent>
                        <Typography component="p">
                          This impressive paella is a perfect party dish and a
                          fun meal to cook together with your guests. Add 1 cup
                          of frozen peas along with the mussels, if you like.
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={classes.actions}
                        disableActionSpacing
                      >
                        <IconButton aria-label="delete to favorites">
                          <DeleteIcon
                            color="primary"
                            onClick={e => this.removeToFavoris(e, elt)}
                          />
                        </IconButton>
                        <Typography variant="caption">
                          Supprimer des favoris
                        </Typography>
                        <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded
                          })}
                          onClick={this.handleExpandClick}
                          aria-expanded={this.state.expanded}
                          aria-label="Show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse
                        in={this.state.expanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography paragraph variant="body2">
                            Method:
                          </Typography>
                          <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering,
                            add saffron and set aside for 10 minutes.
                          </Typography>
                          <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a
                            large, deep skillet over medium-high heat. Add
                            chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes.
                            Transfer shrimp to a large plate and set aside,
                            leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt
                            and pepper, and cook, stirring often until thickened
                            and fragrant, about 10 minutes. Add saffron broth
                            and remaining 4 1/2 cups chicken broth; bring to a
                            boil.
                          </Typography>
                          <Typography paragraph>
                            Add rice and stir very gently to distribute. Top
                            with artichokes and peppers, and cook without
                            stirring, until most of the liquid is absorbed, 15
                            to 18 minutes. Reduce heat to medium-low, add
                            reserved shrimp and mussels, tucking them down into
                            the rice, and cook again without stirring, until
                            mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                          </Typography>
                          <Typography>
                            Set aside off of the heat to let rest for 10
                            minutes, and then serve.
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  ) : (
                    console.log("rourourou")
                  )
              )}
            </div>
          );
          /* <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                overflow: "hidden",
                marginTop: "55px",
                marginBottom: "60px"
              }}
            >
              <Grid key={i} item xs={12} sm container justify="center">
                <Typography
                  color="secondary"
                  variant="display3"
                  style={{ textAlign: "center" }}
                >
                  Favoris
                </Typography>
                {Object.keys(user[keyUser].favoris).map(
                  (elt, i) =>
                    user[keyUser].favoris ? (
                      <Paper
                        key={i}
                        style={{
                          marginBottom: 10,
                          flexGrow: 1,
                          maxWidth: 600,
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                      >
                        <Grid container spacing={16}>
                          <Grid item>
                            <Typography gutterBottom variant="headline">
                              <Star
                                fontSize="inherit"
                                color="primary"
                                style={{ marginRight: 10 }}
                              />
                            </Typography>
                          </Grid>

                          <Grid item xs container spacing={16}>
                            <Grid item>
                              <ButtonBase style={{ width: 158, height: 158 }}>
                                <img
                                  style={{
                                    margin: "auto",
                                    display: "block",
                                    position: "relative",
                                    bottom: 22,
                                    maxWidth: "100%",
                                    maxHeight: "100%"
                                  }}
                                  alt={this.state.user[elt]}
                                  src={user[keyUser].favoris[elt].image}
                                />
                              </ButtonBase>
                              <Grid item>
                                <Typography>{`Plat testé par : ${
                                  this.state.testUser
                                } `}</Typography>
                                <Typography color="textSecondary">{`le ${
                                  this.state.testDate
                                }`}</Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs>
                              <Typography gutterBottom variant="title">
                                {`Restaurant : ${this.Capitalize(
                                  user[keyUser].favoris[elt].restaurant
                                )}`}
                              </Typography>
                              <Typography>
                                {`Note : ${user[keyUser].favoris[elt].note} `}
                              </Typography>
                              <Typography>
                                {`Qualité / Prix : ${
                                  user[keyUser].favoris[elt].qualitePrix
                                } `}
                              </Typography>
                              <Typography>
                                {`Ambiance : ${
                                  user[keyUser].favoris[elt].ambiance
                                } `}
                              </Typography>
                              <Typography>
                                {`Service : ${
                                  user[keyUser].favoris[elt].service
                                } `}
                              </Typography>
                              <Typography>{`Prix : ${
                                user[keyUser].favoris[elt].prix
                              } €`}</Typography>
                            </Grid>
                          </Grid>
                          <Grid item />
                        </Grid>
                      </Paper>
                    ) : null
                )}
              </Grid>
            </div> */
        } else {
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
                title="deconnexion picture"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Vous n'êtes pas connecté
                </Typography>
                <Typography component="p">
                  Vous devez être connecté pour avoir accès à vos favoris.
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
          </Grid>;
        }
      })
    );
  }

  render() {
    const { user, firebaseUser } = this.state;
    const { classes, history } = this.props;
    console.log("====================================");
    console.log(user);
    console.log("====================================");

    if (this.state.loading) {
      return <Loader />;
    }

    if (firebaseUser) {
      // User is signed in.
      return this.UsersFavoris();
    } else {
      // No user is signed in.
      return (
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
              title="deconnexion picture"
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                Vous n'êtes pas connecté
              </Typography>
              <Typography component="p">
                Vous devez être connecté pour avoir accès à vos favoris.
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
        </Grid>
      );
    }
  }
}

export default withRouter(withUser(withStyles(styles)(FavorisList)));
