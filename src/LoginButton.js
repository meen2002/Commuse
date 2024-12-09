import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './getToken.js';
import { accessUrl } from "./getToken.js";

function Loginbotton(props) {
  const hash_token = getTokenFromUrl().access_token;
  const [token, setToken] = useState(localStorage.getItem((getTokenFromUrl().access_token)));

  useEffect(() => {
    const storedToken = localStorage.getItem((getTokenFromUrl().access_token));
    if (storedToken) {
      setToken(storedToken); // ローカルストレージにあるトークンをセット
      props.setIsLogin(true); // ログイン状態を維持
    } else { 
      if (hash_token) {

        localStorage.setItem((getTokenFromUrl().access_token), hash_token);
        setToken(hash_token);
        props.setIsLogin(true);
      }
    }
    window.location.hash = ""; // ハッシュをクリア
  }, [props]);

  return (
    <div className="App">
      <h2>ログイン</h2>
      <a href={accessUrl}>spotifyへログイン</a>
    </div>
  );
}

export default Loginbotton;