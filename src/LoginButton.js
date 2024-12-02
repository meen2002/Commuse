import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './getToken.js';
import { accessUrl } from "./getToken.js";

function Loginbotton(props) {
  const [token, setToken] = useState(localStorage.getItem("spotifyToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyToken");
    if (storedToken) {
      setToken(storedToken); // ローカルストレージにあるトークンをセット
      props.setIsLogin(true); // ログイン状態を維持
    } else {
      const hash_token = getTokenFromUrl().access_token;
      if (hash_token) {
        localStorage.setItem('spotifyToken', hash_token);
        setToken(hash_token);
        props.setIsLogin(true);
      }
    }
    window.location.hash = ""; // ハッシュをクリア
  }, [props]);

  return (
    <div className="App">
      <h2>ログイン前です</h2>
      <a href={accessUrl}>spotifyへログイン</a>
    </div>
  );
}

export default Loginbotton;