import React, { Component } from "react";
import Loader from "./Loader";
import firebase from "firebase";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import InfoIcon from "@material-ui/icons/Info";
import SearchBar from "./SearchBar";
import { Grid, Paper } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import withUser from "./withUser";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/locale/fr";

class PlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plat: {},
      loading: true,
      user: {},
      userConnecter: {},
      key: "",
      InFavoris: ""
    };
  }

  componentDidMount() {
    const plat = firebase.database().ref("plat");
    plat.on("value", snapshot => {
      this.setState({
        plat: snapshot.val(),
        loading: false
      });
    });
    const userBDD = firebase.database().ref("user");
    userBDD.on("value", snapshot => {
      this.setState({
        user: snapshot.val()
      });
    });
  }

  findUser(keyProduct, majFavoris) {
    // currentUser = l'id de l'utilisateur connecté
    const currentUser = firebase.auth().currentUser.uid;
    //user = Tous les utilisateurs dans la BDD
    const { user } = this.state;
    Object.keys(user).map(elt => {
      const recherche = user[elt].id === currentUser;
      if (recherche) {
        const theUserInBDD = user[elt].name;
        console.log(`Ecriture dans la BDD de : ${theUserInBDD}`);
        const updates = {};
        updates["/user/" + elt + "/favoris/" + keyProduct] = majFavoris;
        return firebase
          .database()
          .ref()
          .update(updates);
      } else {
        return console.log("ok");
      }
    });
  }

  majFavoris(key, majFavoris) {
    const { user } = this.state;
    if (user) {
      this.findUser(key, majFavoris);
    }
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

  addToFavoris(e, key, favoris, nom, situation) {
    const currentUser = firebase.auth().currentUser.uid;
    const plat = this.state.plat[key];

    const date = moment();
    date.locale("fr");
    console.log("==============le date======================");
    console.log(date.format("LL"));
    console.log("====================================");

    const majFavoris = { plat, date: date.format("LL") };
    console.log("===========majFavoris=========================");
    console.log(majFavoris);
    console.log("====================================");
    const postUserNameInFavoris = {
      userId: currentUser
    };

    const updates = {};
    updates[
      "/plat/" + key + "/favorisProduct/" + currentUser
    ] = postUserNameInFavoris;

    this.majFavoris(key, majFavoris);

    favoris
      ? toast.warn(`${this.Capitalize(nom)} retiré des favoris`, {
          position: toast.POSITION.TOP_LEFT
        })
      : toast.success(`${this.Capitalize(nom)} ajouté aux favoris`, {
          position: toast.POSITION.TOP_LEFT
        });
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  Capitalize(phrase) {
    return phrase
      .split(" ")
      .map(elt => {
        return elt.replace(elt[0], elt.split("")[0].toUpperCase());
      })
      .join(" ");
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  test(tile, plat) {
    const { user } = this.props;

    Object.keys(plat[tile].favorisProduct).map(fav =>
      console.log(plat[tile].favorisProduct[fav].userId, user.uid)
    );
  }

  star(key, plat) {
    const tab = [];
    const tabFav = [];
    const tabFinal = [];
    const { user } = this.props;

    user &&
      Object.keys(plat[key].favorisProduct).map((fav, i) => {
        tabFav.push(fav);
        const alors = plat[key].favorisProduct[fav].userId === user.uid;

        return tab.push(alors);
      });
    const fav = tabFav[0];

    tab.map(elt => (elt ? tabFinal.push(elt) : null));

    return tabFinal[0] ? (
      <Star
        color="secondary"
        name={this.state.plat[key].favoris.toString()}
        onClick={e => this.removeToFavoris(e, key)}
      />
    ) : (
      <StarBorderIcon
        name={this.state.plat[key].favorisProduct[fav].userId.toString()}
        onClick={e =>
          this.addToFavoris(
            e,
            key,
            this.state.plat[key].favorisProduct[fav].userId,
            this.state.plat[key].nom,
            "premier"
          )
        }
      />
    );
  }

  render() {
    const { user } = this.props;
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      user && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            overflow: "hidden",
            marginTop: "35px",
            marginBottom: "60px"
          }}
        >
          <Paper style={{ marginTop: 30, marginBottom: 20 }}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <SearchBar />
              </Grid>
            </Grid>
          </Paper>
          <GridList
            cellHeight={200}
            spacing={1}
            style={{ width: 500, height: 600 }}
          >
            {this.state.plat &&
              Object.keys(this.state.plat).map(tile => (
                <GridListTile
                  key={tile}
                  cols={tile.featured ? 2 : 1}
                  rows={tile.featured ? 2 : 1}
                >
                  <img
                    src={this.state.plat[tile].image}
                    alt={this.state.plat[tile].nom}
                  />
                  <GridListTileBar
                    title={this.Capitalize(this.state.plat[tile].restaurant)}
                    subtitle={
                      <span>
                        {this.Capitalize(this.state.plat[tile].adresse)}
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        style={{ color: "rgba(255, 255, 255, 0.54)" }}
                      >
                        <InfoIcon
                          onClick={() => this.test(tile, this.state.plat)}
                        />
                      </IconButton>
                    }
                  />
                  <GridListTileBar
                    title={this.Capitalize(this.state.plat[tile].nom)}
                    titlePosition="top"
                    actionIcon={
                      <IconButton style={{ color: "white" }}>
                        {this.state.plat[tile].favorisProduct ? (
                          this.star(tile, this.state.plat)
                        ) : (
                          <StarBorderIcon
                            name={"nope"}
                            onClick={e =>
                              this.addToFavoris(
                                e,
                                tile,
                                null,
                                this.state.plat[tile].nom,
                                "dernier"
                              )
                            }
                          />
                        )
                        /* {this.state.plat[tile].favorisProduct ? (
                          Object.keys(this.state.plat[tile].favorisProduct).map(
                            (fav, i) =>
                              this.state.plat[tile].favorisProduct[fav]
                                .userId &&
                              this.state.plat[tile].favorisProduct[fav]
                                .userId === user.uid ? (
                                <div key={i}>
                                  <Star
                                    color="secondary"
                                    name={this.state.plat[
                                      tile
                                    ].favoris.toString()}
                                    onClick={e => this.removeToFavoris(e, tile)}
                                  />
                                </div>
                              ) : (
                                <div key={i}>
                                  <StarBorderIcon
                                    name={this.state.plat[tile].favorisProduct[
                                      fav
                                    ].userId.toString()}
                                    onClick={e =>
                                      this.addToFavoris(
                                        e,
                                        tile,
                                        this.state.plat[tile].favorisProduct[
                                          fav
                                        ].userId,
                                        this.state.plat[tile].nom,
                                        "premier"
                                      )
                                    }
                                  />
                                </div>
                              )
                          )
                        ) : (
                          <div>
                            <StarBorderIcon
                              name={"nope"}
                              onClick={e =>
                                this.addToFavoris(
                                  e,
                                  tile,
                                  null,
                                  this.state.plat[tile].nom,
                                  "dernier"
                                )
                              }
                            />
                          </div>
                        )} */
                        }
                      </IconButton>
                    }
                    actionPosition="left"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                    }}
                  />
                  <ToastContainer autoClose={3000} />
                </GridListTile>
              ))}
          </GridList>
        </div>
      )
    );
  }
}

export default withUser(PlatList);
