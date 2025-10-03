import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>ようこそ、{user?.email || "ユーザー"}さん！</h1>
        <button onClick={handleLogout} className="logout-button">
          ログアウト
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Festify ダッシュボード</h2>
          <p>システムに正常にログインしました！</p>

          <div className="user-info">
            <h3>ユーザー情報:</h3>
            <p>
              <strong>メールアドレス:</strong> {user?.email}
            </p>
            <p>
              <strong>ID:</strong> {user?.id}
            </p>
            {user?.name && (
              <p>
                <strong>名前:</strong> {user.name}
              </p>
            )}
          </div>
        </div>

        <div className="actions-card">
          <h3>クイックアクション</h3>
          <div className="action-buttons">
            <button className="action-button primary">
              新しいFestifyを作成
            </button>
            <button className="action-button secondary">
              Festifyリストを表示
            </button>
            <button className="action-button secondary">アカウント設定</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
