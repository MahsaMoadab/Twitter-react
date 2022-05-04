import { Grid, IconButton, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { likeTweetRequest } from '../../../api/api_tweet';
import { useTweetDispatch, setTweetText, setLikeTweet } from '../../../context/TweetContext';
import Styles from '../../../styles/Main.module.css';
import {
    useLocation
} from "react-router-dom";



const Tweet = ({ data }) => {

    const { pathname } = useLocation();

    console.log(pathname);

    const tweetDispatch = useTweetDispatch();

    function renderTweet(text) {
        var pattern = /#\S+/g;
        return { __html: text.replace(pattern, `<a style="color:#5ea9dd;text-decoration:none;" class="hashtagLink">$&</a>`) }
    }

    const getImage = () => {
        const profile = data.user.image
        if (profile && profile !== "undefined") {
            return profile
        }
        else {
            return '/images/default-profile.svg'
        }

    }


    const reTweet = () => {
        setTweetText(tweetDispatch, data.text);
    }
    const likeTweet = () => {
        likeTweetRequest(data._id, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            setLikeTweet(tweetDispatch, data._id);
        })

    }

    return (
        <>
            <div className={Styles.tweetItem} id={data._id}>
                <Grid container>
                    <img src={getImage()} alt={'twitterItem'} className={Styles.profiles} />
                    <Grid item className={Styles.tweetColumn}>
                        <Grid item container>
                            <Typography className={Styles.tweetItemName}>{data.user.name}</Typography>
                            <Typography className={Styles.tweetItemId}>{data.user.username}</Typography>
                        </Grid>
                        <Typography style={{ width: (data.image) ? '96%' : 'auto' }} dangerouslySetInnerHTML={renderTweet(data.text)} className={Styles.tweetText} component={'p'} />

                    </Grid>

                    {data.image && <Grid item className={Styles.divImage}><img className={Styles.tweetImage} src={data.image} alt={''} /></Grid>}

                </Grid>
                <Grid container direction={'row-reverse'} className={Styles.btns}>
                    {
                        pathname === '/' &&
                        <IconButton className={Styles.iconButtonReTweet} onClick={reTweet}>
                            <img src={'/images/retweet-icon.svg'} alt={'retweet'} className={Styles.tweetpic} />
                        </IconButton>
                    }
                    <div className={Styles.likeBtn}>
                        <IconButton className={Styles.iconButtonLike} onClick={likeTweet}>
                            <img src={'/images/like-icon.svg'} alt={'retweet'} className={Styles.tweetpic} />
                        </IconButton>
                        <Typography className={Styles.likecount}>{data.likes}</Typography>
                    </div>
                </Grid>
            </div>
        </>
    )
}


export default Tweet;