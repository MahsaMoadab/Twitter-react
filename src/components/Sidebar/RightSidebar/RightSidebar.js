import { ButtonBase, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import useStyle from "./Style";
import { Link } from "react-router-dom";
import { getAllHashTags } from "../../../api/api_tweet";
import { setHashTagList, useTweetDispatch, useTweetState } from "../../../context/TweetContext";
import styles from '../../../styles/Sidebar.module.css';


function RightSidebar() {
    const {hashTagList} = useTweetState();
    const hashTagListDispatch = useTweetDispatch();

    useEffect(() => {
        getAllHashTags((isOk, data) => {
            if(!isOk)
            return console.log(data.message);
            else 
            setHashTagList(hashTagListDispatch,data)
        })
    }, [])
    return (
        <>
            <div className={styles.rightSidebar}>
                <Link className={styles.aLink} to={"/"}>
                    <Grid container className={styles.logoType} >
                        <img className={styles.imgLogo} src={'/images/tweeter-icon.svg'} alt={'twitter-logo'} />
                        <Typography className={styles.typography}>
                            توییتر فارسی
                        </Typography>
                    </Grid>
                </Link>

                <Typography className={styles.typohashtag}>
                    <img src={'/images/fire-icon.svg'} className={styles.twitterTitleIcon} alt={"logout"} />
                    داغ ترین هشتگ ها
                </Typography>
                <Grid container className={styles.boxHashTags}>

                    {
                        hashTagList.map(item => {
                            return (
                                <Link to={"/hashtag/" + item.text}>
                                    <Grid item container>
                                        <ButtonBase className={styles.btnHastag}>
                                                <img className={styles.hashtaghImg} src={'/images/hashtag-icon.svg'} alt={'hashtag'} />
                                            <Typography>
                                                {item.text}
                                            </Typography>
                                        </ButtonBase>
                                    </Grid>
                                </Link>

                            )
                        })
                    }


                </Grid>
            </div>
        </>
    )
}


export default RightSidebar;