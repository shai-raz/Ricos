const getUrl = window.location

export const BASE_API_URL = getUrl.protocol + '//' + getUrl.host.split(':')[0] + ':8081'
export const LOGIN_API_URL = `${BASE_API_URL}/users/login`
export const REGISTER_API_URL = `${BASE_API_URL}/users/post`
export const UNFOLLLOW_API_URL = `${BASE_API_URL}/users/unfollow`
export const SELF_UID_API_URL = `${BASE_API_URL}/users/self/id`