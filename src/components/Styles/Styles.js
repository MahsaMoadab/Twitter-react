import { makeStyles } from "@material-ui/core";

const Styles = makeStyles({
  root: {
    width: "100%",
    fontSize: "25px",
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    // height: '100%',
  },
  mainPart: {
    width: "100%",
    background: "#fff",
    flex: 1
  },
  divider: {
    width: '3px !important',
    height: '100%  !important',
    background: '#a9cffd30',
  },
  content: {
    flex: 1,
    background: '#F4F8FB',
    padding: '0.4em 0.2em',
  }
});

export default Styles;
