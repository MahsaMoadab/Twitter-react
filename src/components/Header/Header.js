// import useStyle from './Style'
import { Typography } from '@material-ui/core';
import Styles from '../../styles/Main.module.css';
const Header = (props) => {

    return (
        <>
            <div className={Styles.header}>
                {props.icon}
                <Typography className={Styles.homeTitle}>
                    {props.headerTitle}
                </Typography>
            </div>
        </>
    )
}


export default Header;