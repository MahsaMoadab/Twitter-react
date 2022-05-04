import { Button, Grid, IconButton, Tooltip } from '@material-ui/core'
// import useStyle from '../Style'
// import className from 'classnames'
import { useRef, useState } from 'react'
import { postNewTweet } from '../../../api/api_tweet'
import { toast } from 'react-toastify'
import Styles from '../../../styles/Main.module.css';
import {useTweetState , setTweetText as setTweet ,useTweetDispatch, setTweetList, updateHashTagList, updateTweetList} from '../../../context/TweetContext';
const NewTweet = () => {

    // const [tweet, setTweet] = useState('');
    const {tweetText : tweet} = useTweetState()
    const tweetDispatch = useTweetDispatch();
    const [imgFile, setImgFile] = useState();
    const [imgPath, setImgPath] = useState();
    const input = useRef();
    const fileRef = useRef();

    const handelUploadImage = (e) => {
        const fileTarget = e.target.files;
        if (fileTarget && fileTarget.length > 0) {
            setImgFile(fileTarget[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgPath(e.target.result)
            };
            reader.readAsDataURL(fileTarget[0])
        }
    }

    const openUploadFile = () => {
        fileRef.current.click();
    }

    const newClickSubmit = () => {
        const textInput = tweet;
        console.log(tweet);
        if (textInput == '') {
            return toast.warn("متنی برای توییت نوشته نشده است.");
        }

        const fomData = new FormData();
        fomData.append('text', textInput)
        if(imgFile)
            fomData.append('image', imgFile)
        postNewTweet(fomData, (isOk) => {
            if (!isOk)
                return toast.error("توییت شما ارسال نشد.")
            setTweet(tweetDispatch,'');
            setImgFile();
            setImgPath();
            updateHashTagList(tweetDispatch);
            updateTweetList(tweetDispatch);
            toast.success("توییت شما با موفقیت ارسال شد.")
        })
    }

    const getImage = () => {
        const profile = localStorage.getItem('image')
        if (profile && profile !== "undefined") {
            return profile
        }
        else {
            return '/images/default-profile.svg'
        }

    }
    return (
        <>
            <div className={Styles.newTweet}>
                <Grid container>
                    <img src={getImage()} alt={'twitterItem'} className={Styles.profiles} />
                    <input
                        placeholder='توییت کن...'
                        className={Styles.tweetInput}
                        ref={input}
                        type={'text'}
                        value={tweet}
                        onChange={e => setTweet(tweetDispatch,e.target.value)}
                    />
                </Grid>
                {imgPath && <img className={Styles.uploatImage} src={imgPath} alt={''} />}
                
                <Grid container direction={'row-reverse'} className={Styles.btns}>
                    <Button onClick={newClickSubmit} className={Styles.tweetButton} variant={'contained'}>توییت</Button>

                    <IconButton onClick={openUploadFile} className={Styles.iconButton}>
                        <Tooltip title="بارگذاری تصویر">
                            <img src={'/images/upload-image.svg'} alt={'gallery'} className={Styles.tweetpic} />
                        </Tooltip>
                    </IconButton>

                    <input
                        type={'file'}
                        style={{ display: 'none' }}
                        accept={"image/*"}
                        ref={fileRef}
                        onChange={handelUploadImage} />
                </Grid>
            </div>
        </>
    )
}


export default NewTweet;