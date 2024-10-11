import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './getToken.js';
import { accessUrl } from "./getToken";


function Loginbotton(props) {

  const [token, setToken] = useState(localStorage.getItem("spotifyToken"))

  useEffect(() => {
    const hash_token = getTokenFromUrl().access_token;
    console.log(hash_token, "tin"); // トークンが正しく取得できているか確認
    window.location.hash = "";

    if (hash_token) {
      localStorage.setItem('spotifyToken', hash_token);
      setToken(localStorage.getItem("spotifyToken"))
      props.setLoginState(true) //ログアウト状態ならログイン状態にする
    }
  }, [props, token]);

  return (
    <div className="App">
      <h2>ログイン前です</h2>
      <a href={accessUrl}>spotifyへログイン</a>
    </div>
  );
}

export default Loginbotton;

