import React,{ useState, useEffect } from 'react';
import Login from './Login';
import LoggedIn from './ LoggedIn.js';
import { getTokenFromUrl } from './getToken.js';

function Loginbotton (){

  const [token, setToken] = useState(localStorage.getItem('spotifyToken'));

  useEffect(() => {
    let isLogin = this.props.isLogin
    const setLoginState = this.props.setLoginState

    const hash = getTokenFromUrl();
    console.log(hash,"tin"); // トークンが正しく取得できているか確認
    window.location.hash = "";
    const token = hash.access_token;
    if (token) {
      setToken(token);  // トークンがある場合にセット
      localStorage.setItem('spotifyToken', token); 

      if(!isLogin) setLoginState() //ログアウト状態ならログイン状態にする
    }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('spotifyToken'); // ログアウト時にトークンを削除
    window.location.reload(); // ページをリロードしてログイン画面に戻る

    if(isLogin) setLoginState() //ログイン状態ならログアウト状態にする
  };

  return (
    <div className="App">
    { token ? <LoggedIn/> : <Login/> } 
    <h2>Logged In with Spotify</h2>
    <button onClick={handleLogout}>Logout</button>
  </div>
  );
}

export default Loginbotton;

