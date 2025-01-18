// LoginButton.js
import React from 'react';
import { accessUrl } from '../infrastructures/getToken';


function LoginButton() {
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

export default LoginButton;
