import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <div className="App">
      <button onClick={onLogout}>ログアウト</button>
    </div>
  );
};

export default LogoutButton;