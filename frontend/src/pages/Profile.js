import React, { useEffect, useState } from 'react'
import styles from "../Styles/profile.module.css"



const Profile = () => {
    const [user, setUser] = useState(null)
    const [userProfileImage, setUserProfileImage] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const user = urlParams.get('user');

        if (user) {

            const userData = JSON.parse(decodeURIComponent(user));
            setUser(userData)
            console.log(userData)

            const getProfileImage = (userData) => {
                const currentProvider = userData.currentProvider
                console.log(userData.profileImage[currentProvider])
                return userData.profileImage[currentProvider] || userData.profileImage.default
            }

            setUserProfileImage(getProfileImage(userData))

        } else {
            console.log("No user data found")
        }
    }, [])




    return (
        <div>
            {user &&
                <div>
                    <h1>{user.fullName}</h1>
                    <img src={userProfileImage} alt="Image_User" />
                    <h3>{user.email}</h3>

                </div>


            }

        </div>
    )
}

export default Profile