import React, { Component } from "react";
import firebase from "firebase";
import StarRatingComponent from "react-star-rating-component";
import {
  Icon,
  Grid,
  Paper,
  ButtonBase,
  FormControl,
  Input,
  InputLabel,
  withStyles,
  TextField,
  MenuItem,
  Button,
  FormHelperText
} from "@material-ui/core";
import geolocation from "geolocation";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

const currencies = [
  {
    value: "Moins de 10€",
    label: "Moins de 10€"
  },
  {
    value: "Entre 10€ et 15€",
    label: "Entre 10€ et 15€"
  },
  {
    value: "Entre 15€ et 20€",
    label: "Entre 15€ et 20€"
  },
  {
    value: "Entre 20€ et 25€",
    label: "Entre 20€ et 25€"
  },
  {
    value: "Entre 30€ et 40€",
    label: "Entre 30€ et 40€"
  },
  {
    value: "Plus que 40€",
    label: "Plus que 40€"
  }
];

class RatingPlat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      restaurant: "",
      ville: "",
      prix: 0,
      favoris: "false",
      image:
        "https://cdn.pixabay.com/photo/2017/06/28/10/53/board-2450236_960_720.jpg",
      note: 0,
      service: 0,
      ambiance: 0,
      qualitePrix: 0
    };
    this.onStarClick = this.onStarClick.bind(this);
  }
  onStarClick(nextValue, name) {
    this.setState({ [name]: nextValue });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    const newPlat = firebase
      .database()
      .ref()
      .child("plat")
      .push().key;
    const updates = {};
    updates["/plat/" + newPlat] = this.state;
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  render() {
    const { classes } = this.props;
    const { note, service, ambiance, qualitePrix } = this.state;

    return (
      <Paper style={{ flexGrow: 1, maxWidth: 600, padding: 10 }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={16}
        >
          <Grid item>
            <ButtonBase style={{ width: 128, height: 128 }}>
              <img
                style={{
                  margin: "auto",
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%"
                }}
                alt="complex"
                src="https://cdn.pixabay.com/photo/2017/04/23/09/03/hamburger-2253349__340.jpg"
              />
            </ButtonBase>
          </Grid>
        </Grid>
        <form onSubmit={e => this.handleSubmit(e)}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="nomDuPlat">Nom du plat</InputLabel>
            <Input
              id="nomDuPlat"
              value={this.state.nom}
              onChange={this.handleChange("nom")}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="nomDuRestau">Nom du Resaturant</InputLabel>
            <Input
              id="nomDuRestau"
              value={this.state.restaurant}
              onChange={this.handleChange("restaurant")}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="ville">Ville</InputLabel>
            <Input
              id="ville"
              value={this.state.ville}
              onChange={this.handleChange("ville")}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="select-price"
              select
              label="Select"
              className={classes.textField}
              value={this.state.prix}
              onChange={this.handleChange("prix")}
              SelectProps={{ MenuProps: { className: classes.menu } }}
              helperText="Selectioner le prix"
              margin="normal"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {" "}
            <Grid>
              Service :
              <StarRatingComponent
                name="ratingService"
                starCount={5}
                value={service}
                onStarClick={e => this.onStarClick(e, "service")}
              />
            </Grid>
            <Grid>
              Ambiance :
              <StarRatingComponent
                name="ambiance"
                starCount={5}
                value={ambiance}
                onStarClick={e => this.onStarClick(e, "ambiance")}
              />
            </Grid>
            <Grid>
              Qualité / Prix :
              <StarRatingComponent
                name="qualitePrix"
                starCount={5}
                value={qualitePrix}
                onStarClick={e => this.onStarClick(e, "qualitePrix")}
              />
              <Grid>
                Note général :
                <StarRatingComponent
                  name="note"
                  starCount={5}
                  value={note}
                  onStarClick={e => this.onStarClick(e, "note")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(RatingPlat);
