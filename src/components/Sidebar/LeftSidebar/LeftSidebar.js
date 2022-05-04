import React, { useEffect, useState } from "react";
import { ButtonBase, Divider, Grid, Typography } from "@material-ui/core";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../api/api_tweet";
import styles from '../../../styles/Sidebar.module.css';

const TwitterLists = () => {
    const [tweetUsers, setTweetUsers] = useState([]);
    useEffect(() => {
        getAllUsers((isOk, data) => {
            if (!isOk)
                return console.log(data.message);
            else
                setTweetUsers(data)
        })
    }, [])


    const getImage = (profile) => {
        if (profile && profile !== "undefined") {
            return profile
        }
        else {
            return '/images/default-profile.svg'
        }
    }
    return (
        <>
            <Grid item className={styles.twitterLists}>
                <Typography className={styles.twitterTitle}>
                    <img src={'/images/bestTweeter.svg'} className={styles.twitterTitleIcon} alt={"logout"} />
                    بهترین خبرنگاران
                </Typography>
                <Grid className={styles.bestTweeter} item container>
                    {
                        tweetUsers.map(item => {
                            return (
                                <Link className={styles.tweetUsers} to={`/user/${item._id}/${item.name}`}>
                                    <ButtonBase className={styles.twitterItem}>
                                        <Grid container className={styles.items}>
                                            <img src={getImage(item.image)} alt={'twitterItem'} className={styles.itemImg} />
                                            <Grid item className={styles.itemText}>
                                                <Typography className={styles.itemTitle}>
                                                    {item.name}
                                                </Typography>
                                                <Typography className={styles.itemId}>
                                                    {item.username}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ButtonBase>
                                </Link>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

function LeftSidebar() {
    return (
        <>
            <div className={styles.rootLeft}>
                <Profile />
                <TwitterLists />
            </div>
        </>
    )
}


export default LeftSidebar;