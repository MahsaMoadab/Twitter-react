import Axios from 'axios'


export const getAxiosInstance = () => {

    return (
        Axios.create({
            baseURL: 'http://localhost:3000',
        })
    )

}

export const getAxiosInstanceAPITwitter = () => {

    return (
        Axios.create({
            baseURL: 'https://twitterapi.liara.run/api/',
        })
    )

}
export const getAxiosInstanceAPI = () => {
    return (
        Axios.create({
            baseURL: 'https://twitterapi.liara.run/api/',
            headers: {
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
    )
}
