import React from "react";
import useStyle from './Style'


const P404 = () => {
    const classes = useStyle();
    return (
        <>
            <div className={classes.root}>
                <img width={'400px'} height={'400px'} src={'/images/404.svg'} alt={'twitter-logo'} />
                <h3>404</h3>
                <p>
                    صفحه مورد نظر وجود ندارد
                </p>
            </div>
        </>
    )
}

export default P404;