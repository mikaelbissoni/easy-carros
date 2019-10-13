import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1171a8"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: "#e54848"
    },
    background: {
      default: "#fff"
    }
  }
});

export default theme;
