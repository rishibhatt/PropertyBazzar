import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
export default function useUserProfile() {
    const {token,username} = useAuth();
    const [profile,setProfile] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [ profileImage,setProfileImage] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
                axios.get(`https://propertybazzar-server.onrender.com/user/${username}`) 
                    .then(response => {
                        setProfile(response.data);
                        setProfileImage(response.data.profile)
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Error fetching profile picture:', err);
                        setLoading(false);
                        setError(err)
                    });
        };
        if(token){
            fetchProfile();
        }
        else{
            setLoading(false)
        }
      }, [token,username]);
      
 return {profile,error,loading,profileImage}
}


