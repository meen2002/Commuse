import React, { useEffect, useState } from "react";
import { getTokenFromUrl, accessUrl } from "./infrastructures/SpotifyAPI/getToken";

function Loginbotton(props) {
  const [token, setToken] = useState(null);
  const hashToken = getTokenFromUrl().access_token;


  useEffect(() => {
    const initializeLogin = async () => {
      if (hashToken) {
        // 一時的にトークンを保存
        setToken(hashToken);

        // ユーザー情報を取得
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${hashToken}`,
          },
        });

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          const myId = userData.id;
          console.log(myId)
          

          props.onUserId(myId)

          // ユーザー固有のキーでトークンを保存
          localStorage.setItem(`spotifyToken_${myId}`, hashToken);

          // ログイン状態を設定
          props.setIsLogin(true);
        } else {
          console.error("Failed to fetch user profile");
        }
      }

      window.location.hash = ""; // URLハッシュをクリア
    };

    initializeLogin();
  }, [hashToken, props]);

  return (
    <div className="login-container">
      <h1>BeatBridge</h1>
      <h2 className="login-title">ログイン</h2>
      <a href={accessUrl} className="login-button">
        Spotifyへログイン
      </a>
    </div>
  );
}

export default Loginbotton;

