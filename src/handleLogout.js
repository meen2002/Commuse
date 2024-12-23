import React from 'react';

const LogoutHandler = ({ setIsLogin, myId }) => {
  // ログアウト処理
  const handleLogout = async () => {
    // ローカルストレージからSpotify関連のデータを削除
    const tempToken = localStorage.getItem(`spotifyToken_${myId}`);

    if (tempToken) {
      // ユーザーIDに基づいてキーを生成し削除
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        if (response.status === 200) {
          const userData = await response.json();
          const userId = userData.id;

          // 削除するキー
          const userNameKey = `spotifyToken_${userId}_userName`;

          // トークンとユーザーネームを削除
          localStorage.removeItem(`spotifyToken_${myId}`);
          localStorage.removeItem(userNameKey);
        }
      } catch (error) {
        console.error("ユーザープロファイルの取得中にエラーが発生しました:", error);
      }
    }

    // ログイン状態を解除
    setIsLogin(false);

    // ローカルストレージにログイン状態を保存
    localStorage.removeItem(`spotifyToken_${myId}`); // 追加された部分

    // ログイン状態を解除
    localStorage.removeItem('isLogin_${myId}');

    // ページをリロードしてログイン画面に戻る
    window.location.reload();
  };

  return handleLogout; // handleLogout関数を返す
};

export default LogoutHandler;

