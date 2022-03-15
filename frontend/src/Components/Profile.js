import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import '../css/profile.css'
import ProfileMiniPost from './ProfileMiniPost'
import ProfilePicture from './ProfilePicture'
import { BASE_API_URL, SELF_UID_API_URL, UNFOLLLOW_API_URL } from '../consts'
import Loading from './Loading'
import Recipe from '../helpers/Recipe'

const Profile = (props) => {
    const [uid, setUid] = useState(props.match.params.uid)
    const [userInfo, setUserInfo] = useState()
    const [selfUser, setSelfUser] = useState(typeof props.match.params.uid === 'undefined')
    const [selfUserId, setSelfUserId] = useState(-1)
    const [recipes, setRecipes] = useState()
    const jwt = localStorage.getItem('jwt')

    const headers = useMemo(() => {
        return {
            "Authorization": "Bearer " + jwt,
        }
    }, [jwt])

    const config = useMemo(() => {
        return {
            headers: headers
        }
    }, [headers])

    const fetchSelfUserId = useCallback(() => {
        axios
            .get(SELF_UID_API_URL, config)
            .then((res) => {
                //console.log("self user id: ", res.data)
                setSelfUserId(res.data)
                if (selfUser)
                    setUid(res.data)
            })
    }, [config])

    const fetchUserInfo = useCallback(() => {
        axios
            .get(`${BASE_API_URL}/users/${uid}`, config)
            .then((res) => {
                console.log(res.data.result[0])
                if (res.data.result[0])
                    setUserInfo(res.data.result[0])
                else
                    setUserInfo(-1)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [config, uid])

    const fetchUserRecipes = useCallback(() => {
        axios
            .get(`${BASE_API_URL}/users/${uid}/recipes`)
            .then((res) => {
                // convert recipes to Recipe objects
                const newRecipes = res.data.result.map(
                    recipe => {
                        return new Recipe(
                            recipe['rid'],
                            recipe['uid'],
                            recipe['fullName'],
                            recipe['profilePic'],
                            recipe['date'],
                            recipe['title'],
                            recipe['description'],
                            recipe['img'],
                            recipe['ingredients'],
                            recipe['steps'],
                            recipe['numOfLikes']
                        )
                    })

                //console.log(newRecipes)
                setRecipes(newRecipes)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [uid])

    const followUser = () => {
        const data = {
            uid: uid
        }

        if (!userInfo.following) { // follow
            axios
                .post(`${BASE_API_URL}/users/follow`, data, config)
                .then((res) => {
                    //console.log(res)
                    fetchUserInfo()
                })
                .catch((err) => {
                    console.error(err)
                })
        } else { // unfollow
            axios
                .delete(UNFOLLLOW_API_URL, { data, headers })
                .then((res) => {
                    fetchUserInfo()
                    //console.log(res)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    useEffect(() => {
        // get user own id
        fetchSelfUserId()

        // fetch user info 
        if (uid && !userInfo)
            fetchUserInfo()

        // fetch user recipes
        if (uid)
            fetchUserRecipes()

        if (userInfo && selfUserId !== -1)
            if (userInfo?.uid === selfUserId)
                setSelfUser(true)
    }, [userInfo, uid, selfUserId])

    if (!userInfo)
        return (
            <Loading />
        )

    if (userInfo === -1)
        return (
            <div className="profile-container">
                <div style={{ textAlign: "center" }}>
                    User does not exist
                </div>
            </div>
        )

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="profile-info-left">
                    <ProfilePicture
                        size="lg"
                        isLink={false}
                        imgUrl={userInfo.profilePic} />
                </div>

                <div className="profile-info-center">
                    <div className="profile-name-and-follow">
                        <div className="profile-info-name">
                            {userInfo.firstName} {userInfo.lastName}
                        </div>

                        <div className="profile-follow">
                            {!selfUser ?
                                <button className={`profile-follow-button ${(userInfo?.following ? 'profile-unfollow-button' : '')}`} onClick={followUser}>
                                    {(userInfo?.following ? "Unfollow" : "Follow")}
                                </button>
                                : ""}
                        </div>
                    </div>

                    <div className="profile-info-bio">
                        {userInfo.bio}
                    </div>
                </div>

                <div className="profile-info-right">
                    <div className="profile-info-stats">
                        <span>
                            <strong>{userInfo.numOfRecipes}</strong> Recipes
                        </span>
                        <span>
                            <strong>{userInfo.numOfFollowers}</strong> Followers
                        </span>
                        <span>
                            <strong>{userInfo.numOfFollowing}</strong> Following
                        </span>
                    </div>
                </div>

            </div>

            <div className="profile-posts">
                {!recipes && <Loading />}
                {recipes?.length === 0 && <div className="profile-posts-no-recipes">User has no recipes</div>}
                {recipes?.map((recipe, i) => {
                    return <ProfileMiniPost
                        key={i}
                        recipe={recipe} />
                })}
                {/*<ProfileMiniPost
                    postId="1"
                    title="Avocado Dip"
                    img="https://d1yfn1dfres2va.cloudfront.net/001/8c/f4/8cf48a1dac2eb3f409e62952dbbbd442_640m.jpg"
                    description="Very yummy avocado dip" />
                <ProfileMiniPost
                    postId="2"
                    title="Pizza Margherita"
                    img="http://cdn.shopify.com/s/files/1/0508/5514/9736/articles/8fe368762e1a65f1d82eb952ef5a0e71.jpg?v=1621429226"
                    description="Italian pizza" />
                <ProfileMiniPost
                    postId="3"
                    title="New York Strip"
                    img="https://i.pinimg.com/736x/ea/fd/60/eafd600a934d3fb7ef4a228387953485.jpg"
                    description="Delicious steak" />
                <ProfileMiniPost
                    postId="3"
                    title="New York Strip"
                    img="https://i.pinimg.com/736x/ea/fd/60/eafd600a934d3fb7ef4a228387953485.jpg"
                    description="Delicious steak" />
                <ProfileMiniPost
                    postId="3"
                    title="New York Strip"
                    img="https://i.pinimg.com/736x/ea/fd/60/eafd600a934d3fb7ef4a228387953485.jpg"
                    description="Delicious steak" /> */}
            </div>
        </div>
    )
}

export default Profile