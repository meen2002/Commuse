import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromUrl } from './getToken.js';

const SpotifyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const username = localStorage.getItem(getTokenFromUrl().access_token+"userName")

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
          // 親コンポーネントにデータを渡す

        })
        .catch((error) => {
          setError(error.response ? error.response.data : error.message);
        });
    }
  }, [localStorage.getItem(getTokenFromUrl().access_token)]);

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
      <h2>{username}</h2>
      {userInfo.images.length > 0 ? (
        <img
          src={userInfo.images[0].url}
          alt="Profile"
          width="100"
          height="100"
        />
      ) : (
        <div>No profile image</div>
      )}
    </div>
  );

};

export default SpotifyProfile;
