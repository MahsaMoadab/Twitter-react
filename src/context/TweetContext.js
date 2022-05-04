import React from "react";
import { getAllHashTags, getAllTweets } from "../api/api_tweet";

var TweetStateContext = React.createContext();
var TweetDispatchContext = React.createContext();

const typeTweetText = "SET_TWEET_TEXT";
const typeLikeTweet = "SET_LIKE_TWEET";
const typeTweetList = "SET_TWEET_LIST";
const typeHashTagList = "SET_HASHTAG_LIST";

function tweetReducer(state, action) {
  switch (action.type) {
    case typeTweetText:
      return { ...state, tweetText: action.payload };
    case typeLikeTweet:
      const TweetID = action.payload;
      const findTweetIndex = state.tweetList.findIndex((item) => item._id === TweetID);
      if (findTweetIndex === -1)
        return state;
      return { ...state, tweetList: [...state.tweetList.slice(0, findTweetIndex), { ...state.tweetList[findTweetIndex], likes: state.tweetList[findTweetIndex].likes + 1 }, ...state.tweetList.slice(findTweetIndex + 1)] };
    case typeTweetList:
      return { ...state, tweetList: action.payload };
    case typeHashTagList:
      return { ...state, hashTagList: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({ children }) {
  var [state, dispatch] = React.useReducer(tweetReducer, {
    tweetText: "",
    tweetList: [],
    hashTagList: [],
  });
  return (
    <TweetStateContext.Provider value={state}>
      <TweetDispatchContext.Provider value={dispatch}>
        {children}
      </TweetDispatchContext.Provider>
    </TweetStateContext.Provider>
  );
}

function useTweetState() {
  var context = React.useContext(TweetStateContext);
  if (context === undefined) {
    throw new Error("useTweetState must be used within a TweetProvider");
  }
  return context;
}

function useTweetDispatch() {
  var context = React.useContext(TweetDispatchContext);
  if (context === undefined) {
    throw new Error("useTweetDispatch must be used within a TweetProvider");
  }
  return context;
}

export { TweetProvider, useTweetState, useTweetDispatch, setTweetText, setLikeTweet, setTweetList, setHashTagList, updateHashTagList, updateTweetList };

// ###########################################################
function setTweetText(dispatch, tweetText) {
  dispatch({
    type: typeTweetText,
    payload: tweetText,
  });
}

function setLikeTweet(dispatch, id) {
  dispatch({
    type: typeLikeTweet,
    payload: id,
  });
}

function setTweetList(dispatch, list) {
  dispatch({
    type: typeTweetList,
    payload: list,
  });
}

function setHashTagList(dispatch, list) {
  dispatch({
    type: typeHashTagList,
    payload: list,
  });
}

function updateHashTagList(dispatch) {
  getAllHashTags((isOk, data) => {
    if (isOk) {
      dispatch({
        type: typeHashTagList,
        payload: data,
      });
    }
  })
}

function updateTweetList(dispatch) {
  getAllTweets((isOk, data) => {
    if (isOk) {
      dispatch({
        type: typeTweetList,
        payload: data,
      });
    }
  })
}