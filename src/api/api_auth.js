import {getAxiosInstanceAPITwitter ,getAxiosInstanceAPI} from './api'

export const signInApi = (data,callback )=>{
    getAxiosInstanceAPITwitter().post('login', data)
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error.response.data.message);
    })
}

export const signUpApi = (data,callback )=>{
    getAxiosInstanceAPITwitter().post('register', data)
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error.response.data.message);
    })
}

export const uploadUserPhoto = (photo,callback )=>{
    getAxiosInstanceAPI().post('uploadUserPhoto', photo)
    .then(response =>{
        const data = response.data;
        callback(true , data)
    })
    .catch(error =>{
        callback(false , error.response.data.message);
    })
}


export const getUserProfile = (callback)=>{
    getAxiosInstanceAPI().get('getProfile')
    .then(response=>{
        const data = response.data;
        callback(true, data);
    })
    .catch(error=>{
        callback(false, error);
    })
}