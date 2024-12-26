import React, { useEffect, useState } from "react";
import { getTokenFromUrl, accessUrl } from "./getToken.js";

// 現在再生中の曲情報を取得する関数
// async function fetchCurrentlyPlaying(token) {
//   try {
//     if (!token) return null;

//     const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing?market=JP", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.status === 200) {
//       const data = await response.json();
//       return { data, status: 200 };
//     } else {
//       return { status: response.status };
//     }
//   } catch (error) {
//     console.error("Error fetching currently playing song:", error);
//     return null;
//   }
// }

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
