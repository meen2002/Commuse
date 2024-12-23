import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tempToken = localStorage.getItem("spotify_token_temp");

    if (!tempToken) {
      setError("トークンが見つかりません。ログインしてください。");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          setError("Spotifyの認証に失敗しました。再ログインしてください。");
        }
      } catch (err) {
        setError("再ログインしてください。");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>; // エラーメッセージを表示
  }

  if (!userInfo) {
    return <div>Loading...</div>; // ローディング状態を表示
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
          <p>{userInfo.display_name}</p>
        </>
      ) : (
        <div
          className="no-img-placeholder"
          style={{
            backgroundColor: "#ccc",
            width: "50px",
            height: "50px",
            marginLeft: "8px",
          }}
        ></div>
      )}
    </div>
  );
};

export default SpotifyProfile;
