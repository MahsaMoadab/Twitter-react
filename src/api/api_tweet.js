import {getAxiosInstance, getAxiosInstanceAPI} from './api'



export const getAllUsers = (callback)=>{

    getAxiosInstanceAPI().get('getAllUser')
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error);
    })
}

export const getAllHashTags = (callback)=>{
    getAxiosInstanceAPI().get('getAllHashTags')
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error);
    })
}

export const postNewTweet = (data,callback )=>{
    getAxiosInstanceAPI().post('newTweet', data)
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error);
    })
}


export const likeTweetRequest = (id,callback )=>{
    getAxiosInstanceAPI().get('likeTweet/'+ id)
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error);
    })
}


export const getAllTweets = (callback )=>{
    getAxiosInstanceAPI().post('getAllTweet')
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error.response.data.message);
    })
}


export const getTweetByHashTagRequest= (hashTag, callback )=>{
    getAxiosInstanceAPI().post('getAllTweet', {hashTag})
    .then(response =>{
        const data = response.data;
        callback(true, data)
    })
    .catch(error =>{
        callback(false, error);
    })
}

export const getTweetByUserRequest= (user, callback )=>{
    getAxiosInstanceAPI().post('getAllTweet', {user})
    .then(response =>{
        const data = response.data;
        callback(true, data)
    })
    .catch(error =>{
        callback(false, error);
    })
}

