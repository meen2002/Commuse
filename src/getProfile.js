import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromUrl } from './getToken.js';

const SpotifyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const tempToken = localStorage.getItem("spotify_token_temp");

    if (!tempToken) {
      setError("トークンが見つかりません。ログインしてください。");
      return;
    }

    // ユーザーIDを取得してトークン管理
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        const userId = userResponse.data.id;
        const tokenKey = `spotifyToken_${userId}`;
        const userNameKey = `${tokenKey}_userName`;

        // トークンをユーザーIDに基づいて保存（初回ログイン時）
        if (!localStorage.getItem(tokenKey)) {
          localStorage.setItem(tokenKey, tempToken);
        }

        // ユーザー情報を設定
        setUserInfo(userResponse.data);

        // ユーザー名をローカルストレージに保存し、状態に反映
        if (!localStorage.getItem(userNameKey)) {
          localStorage.setItem(userNameKey, userResponse.data.display_name);
        }
        setUsername(localStorage.getItem(userNameKey));
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
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
          <div
            className="no-img-placeholder"
            style={{
              backgroundColor: "#ccc",
              width: "50px",
              height: "50px",
              marginLeft: "8px",
            }}
          ></div>
          <p>{username}</p>
        </>
      )}
    </div>
  );
};

export default SpotifyProfile;
