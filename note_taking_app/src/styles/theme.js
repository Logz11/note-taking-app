import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4db9c8',
      light: '#5fe3f5',
      green: '#21FF4F',
    },
    secondary: {
      main: '#e4e4e4',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '200px',
        textTransform: 'lowercase',
        fontWeight: 'bold'
      },
    },
  },
});

export default theme;