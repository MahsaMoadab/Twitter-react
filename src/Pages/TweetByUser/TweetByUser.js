import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TweetList from '../Home/components/TweetList';
import { useParams } from 'react-router';
import { getTweetByUserRequest } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import Styles from '../../styles/Main.module.css';
import { setTweetList, useTweetDispatch, useTweetState } from '../../context/TweetContext';
import { useLocation } from 'react-router-dom';

const TweetByUser = () => {

    let { userId, userName } = useParams();
    let location = useLocation();
    const { tweetList } = useTweetState();
    const tweetDispatch = useTweetDispatch();
    // const [tweets, setTweets] = useState([]);
    useEffect(() => {
        getTweetByUserRequest(userId, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            else
                setTweetList(tweetDispatch, data)
        })
    }, [location])

    return (
        <>
            <div className={Styles.root}>
                <Header headerTitle={userName} icon={<AccountCircleRoundedIcon fontSize="large" />} />
                <div className={Styles.contentsMain}>
                    {
                        tweetList.length === 0 &&
                        <div className={Styles.tweetItem}>
                            <p  className={Styles.notFound}>
                                اين كاربر توييتی تا الان نداشته است
                            </p>
                        </div>
                    }
                    <TweetList data={tweetList} />
                </div>
            </div>
        </>
    )
}


export default TweetByUser;