import Tweet from './Tweet';
import Styles from '../../../styles/Main.module.css';



const TweetList = ({ data }) => {
    return (
        <>
            <div className={Styles.tweetList}>
                {data.map(tweet => (<Tweet data={tweet} />))}
            </div>
        </>
    )
}


export default TweetList;