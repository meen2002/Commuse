import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromUrl } from './getToken.js';

const SpotifyProfile = ({ onImageChange }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem((getTokenFromUrl().access_token))}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);

          // if (response.data.images && response.data.images.length > 0) {
          //   onImageChange(response.data.images);  // コールバックで親に画像情報を渡す
          // }
        })
        
        .catch((error) => {
          setError(error.response ? error.response.data : error.message);
        });
  }, [onImageChange]);

  // ローディング中やエラーメッセージの処理
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spotify-profile">
      <h2>{userInfo.display_name}</h2>
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
