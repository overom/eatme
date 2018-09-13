import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import BottomMenu from "./BottomMenu";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function Loader(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            style={{ position: "absolute", top: "40%" }}
            alignItems="center"
            direction="row"
            justify="center"
          >
            <CircularProgress
              className={classes.progress}
              size={80}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
      <BottomMenu />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);
