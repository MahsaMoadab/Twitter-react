import { makeStyles } from "@material-ui/core";

const Styles = makeStyles(Theme => ({
    root: {
        background: '#F6F6F6',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        background: '#fff',
        height: '37em',
        borderRadius: '2em',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)',

    },
    imgFlex: {
        width: '26em',
    },
    loginPage: {
        width: '100%',
        height: '100%'
    },
    loginBox: {
        justifyContent: 'space-between',
        height: '100%',

    },
    contentBox: {
        widows: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default Styles;