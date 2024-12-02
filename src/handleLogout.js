import React from 'react';

const LogoutHandler = ({ setIsLogin }) => {
  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem('spotifyToken'); // トークンを削除
    setIsLogin(false); // ログイン状態をfalseに設定
    window.location.reload(); // ページをリロードしてログイン画面に戻る
  };

  return handleLogout; // handleLogout関数を返す
};

export default LogoutHandler;