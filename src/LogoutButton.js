import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './getToken.js';
import { accessUrl } from "./getToken.js";


function LogoutButton(props) {

    const [token, setToken] = useState(localStorage.getItem("spotifyToken"))

    const handleLogout = () => {
        if (props.isLogin) {
            localStorage.removeItem('spotifyToken'); // ログアウト時にトークンを削除
            setToken(localStorage.getItem("spotifyToken"))

            window.location.reload(); // ページをリロードしてログイン画面に戻る

            props.setIsLogin(false) //ログイン状態ならログアウト状態にする
        }
    };

    return (
        <div className="App">
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
}

export default LogoutButton;

