import React, { useState } from "react";

const LoggedInScreen = ({ userName, handleLogout, userImage }) => {
  const [showMenu, setShowMenu] = useState(false);  // メニュー表示制御

  const handleSpotifyLink = () => {
    window.open("https://www.spotify.com", "_blank");  // Spotifyのトップページを新しいタブで開く
  };

  return (
    <div className="logged-in-container">
      <div className="header">
        <h1 className="LoggedApp-title">BeatBridge</h1>
        <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
          {/* プロフィール画像を円形で表示 */}
          <img
            src={userImage || "https://via.placeholder.com/50"} // プロフィール画像のURL、デフォルトの画像も設定
            alt="Profile"
            className="profile-photo"
          />
          <span className="username">{userName}</span>
        </div>
        {showMenu && (
          <div className="dropdown-menu">
            <button className="menu-item logout-button" onClick={handleLogout}>ログアウト</button>
            <button className="menu-item spotify-link" onClick={handleSpotifyLink}>Spotify</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInScreen;
