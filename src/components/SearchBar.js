import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Search from "@material-ui/icons/Search";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

function SearchBar(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Recherche" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
