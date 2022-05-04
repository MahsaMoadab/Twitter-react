import { createMuiTheme } from "@material-ui/core";
import tinycolor from "tinycolor2";

const colorPrimary = '#5ea9dd';
const Theme = createMuiTheme({
  direction: 'rtl',
  palette:{
    primary:{
      main: colorPrimary,
      light:tinycolor(colorPrimary).lighten().toHexString(),
    },
    secondary:{
      main:'#000'
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        lineHeight:2,
      }
    }
  }
});

export default Theme;
