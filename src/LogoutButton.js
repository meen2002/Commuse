import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <div className="logout-container">
      <button  className="logout-button" onClick={onLogout}>ログアウト</button>
    </div>
  );
};

export default LogoutButton;