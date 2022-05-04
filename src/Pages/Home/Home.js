import React, { useEffect } from 'react'
import Header from '../../components/Header/Header';
import NewTweet from './components/NewTweet';
import TweetList from './components/TweetList';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { getAllTweets } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import Styles from '../../styles/Main.module.css';
import { useTweetDispatch, useTweetState ,setTweetList } from '../../context/TweetContext';
import { useLocation } from 'react-router-dom';



const Home = () => {

    let location = useLocation();

    const {tweetList: tweets} = useTweetState();
    const tweetListDispatch = useTweetDispatch();
    useEffect(() => {
        getAllTweets((isOk, data) => {
            if (!isOk)
                return toast.error(data)
            else
            setTweetList(tweetListDispatch , data)
        })
    }, [location])

    return (
        <>
            <div className={Styles.root}>
                <Header headerTitle={'خانه'} icon={<HomeRoundedIcon fontSize="large" />} />
                <NewTweet />
                <div className={Styles.tweetLists}>
                    <TweetList data={tweets} />
                </div>
            </div>
        </>
    )
}

export default Home;