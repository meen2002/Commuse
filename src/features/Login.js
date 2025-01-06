// Login.js
import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "../infrastructures/getToken";

function Login(props) {
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
          console.log(myId);

          // ユーザーIDを親コンポーネントに渡す
          props.onUserId(myId);

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

  return null; // ログインボタンの表示はLoginButtonで行う
}

export default Login;
