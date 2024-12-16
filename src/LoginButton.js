import React, { useEffect, useState } from "react";
import { getTokenFromUrl, accessUrl } from "./getToken.js";

async function fetchCurrentlyPlaying() {
  try {
    const token = localStorage.getItem("spotify_token_temp");
    if (!token) return null;

    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing?market=JP", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { data, status: 200 };
    } else {
      return { status: response.status };
    }
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return null;
  }
}

function Loginbotton(props) {
  const hashToken = getTokenFromUrl().access_token;

  useEffect(() => {
    const initializeLogin = async () => {
      if (hashToken) {
        // 一時的にトークンを保存
        localStorage.setItem("spotify_token_temp", hashToken);

        // ユーザー情報を取得
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${hashToken}`,
          },
        });

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          const userId = userData.id;

          // ユーザー固有のキーでトークンを保存
          localStorage.setItem(`spotifyToken_${userId}`, hashToken);

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
    <div className="App">
      <h2>ログイン</h2>
      <a href={accessUrl}>Spotifyへログイン</a>
    </div>
  );
}

export default Loginbotton;
