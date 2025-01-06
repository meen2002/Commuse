import React, { useState, useEffect } from "react";
import { MyName,MyImage } from "./GetMyProf";

const LoggedInScreen = ({handleLogout, status}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSpotifyLink = () => {
    window.open("https://www.spotify.com", "_blank");  // Spotifyのトップページを新しいタブで開く
  };

  useEffect(() => {
    // statusが200か204以外の場合にアラートを表示
    if (status == 401 ) {
      alert("セッションの有効期限が切れました。再ログインしてください。");
      handleLogout(); // alert後にログアウト処理を実行
    }
  }, [status, handleLogout]);

  return (
    <div className="logged-in-container">
      <div className="header">
        <h1 className="LoggedApp-title">BeatBridge</h1>
        <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
          {/* プロフィール画像を円形で表示 */}
          <img
            src={MyImage || "https://via.placeholder.com/50"} // プロフィール画像のURL、デフォルトの画像も設定
            alt="Profile"
            className="profile-photo"
          />
          <span className="username">{MyName}</span>
        </div>
        {showMenu && (
          <div className="dropdown-menu">
            <button className="menu-item spotify-link" onClick={handleSpotifyLink}>Spotify</button>
            <button className="menu-item logout-button" onClick={handleLogout}>ログアウト</button>
          </div>
        )}
      </div>

    </div>
  );
};

export default LoggedInScreen;
