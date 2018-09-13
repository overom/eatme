import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ae384f",
      main: "#9A0723",
      dark: "#6b0418",
      contrastText: "#fff"
    },
    secondary: {
      light: "#a7e37b",
      main: "#91DC5A",
      dark: "#659a3e",
      contrastText: "#fff"
    }
  }
});
export default theme;
