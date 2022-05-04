import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import TweetList from '../Home/components/TweetList';
import { useParams } from "react-router-dom";
import { getTweetByHashTagRequest } from '../../api/api_tweet';
import { toast } from 'react-toastify';
import Styles from '../../styles/Main.module.css';
import { useTweetDispatch, useTweetState ,setTweetList } from '../../context/TweetContext';
import { useLocation } from 'react-router-dom';

const TweetByHashTag = () => {
    let { hashTagId } = useParams();
    let location = useLocation();
    const {tweetList} = useTweetState();
    const tweetDispatch = useTweetDispatch();
    useEffect(() => {
        getTweetByHashTagRequest(hashTagId ,(isOk,data) => {            
            if (!isOk)
                return toast.error(data)  
            else 
            setTweetList(tweetDispatch , data)
        })
    }, [location])


    return (
        <>
            <div className={Styles.root}>
                <Header  headerTitle={hashTagId} icon={<TagRoundedIcon fontSize="large"/>}/>
                <div className={Styles.contentsMain}>
                    <TweetList data={tweetList} />
                </div>
            </div>
        </>
    )
}


export default TweetByHashTag;