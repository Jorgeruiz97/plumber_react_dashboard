import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#4e565a",
            main: "#022145",
            dark: "#111619",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffff00",
            contrastText: "#000"
        },
    },
    overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1.25em",
            color: "white",
            backgroundColor: "#808080"
          }
        }
      }
})

export default responsiveFontSizes(theme);