import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromUrl } from './getToken.js';

const SpotifyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername]= useState("")


 
  useEffect(() => {
    const token = localStorage.getItem(getTokenFromUrl().access_token);
    
    if (token) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setUsername(localStorage.getItem(getTokenFromUrl().access_token+"userName"))
        })
        .catch((error) => {
          setError(error.response ? error.response.data : error.message);
        });
    }
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

if (userInfo){
  localStorage.setItem(getTokenFromUrl().access_token+"userName",userInfo.display_name)
}

  return (

    <div className="spotify-profile">
      {userInfo.images.length > 0 ? (
        <>

        <img
        className="profile-image"
          src={userInfo.images[0].url}
          alt="Profile"
          width="50"
          height="50"
        />
        <p>{username}</p>
        </>
      ) : (
          <>
        <div className="no-img-placeholder" 
        style={{ backgroundColor: '#ccc', width: '50px', height: '50px', marginLeft: '8px' }}></div>
          <p>{username}</p>
          </>
      )}
    </div>
  );

};

export default SpotifyProfile;