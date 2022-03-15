import axios from 'axios'
import { BASE_API_URL } from '../consts'

/*  posts comment to db
    throws error if unsuccessful
*/
export const postComment = async (rid, content, jwt) => {
    const headers = {
        "Authorization": "Bearer " + jwt,
    }

    const data = {
        rid: rid,
        content: content
    }

    return axios
        .post(BASE_API_URL + "/recipes/comments/post", data, { headers })
        .then((res) => {
            if (res.status === 200)
                return true
            else
                return false
        })
}

/*  fetch comments for specific recipe 
    throws error if unsuccessful
*/
export const fetchComments = async (postId) => {
    return axios
        .get(BASE_API_URL + "/recipes/comments/get/" + postId)
        .then((res) => {
            return res.data.result
        })
}