import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FestifyList from "./FestifyList";
import AdminFestify from "./AdminFestify";
import StatsCard from "./StatsCard";
import "../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:3000/api/v1";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard', 'festifyList', 'adminFestify'
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  React.useEffect(() => {
    if (currentView === "dashboard") {
      fetchStats();
    }
  }, [currentView]);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const response = await fetch(`${API_BASE_URL}/stats`, {
          credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show FestifyList if currentView is 'festifyList'
  if (currentView === "festifyList") {
    return (
      <div>
        <div className="dashboard-header">
          <h1>Festify システム</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="logout-button"
              style={{ background: "#666" }}
            >
              ダッシュボードに戻る
            </button>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </div>
        </div>
        <FestifyList />
      </div>
    );
  }

  // Show AdminFestify if currentView is 'adminFestify'
  if (currentView === "adminFestify") {
    return (
      <div>
        <div className="dashboard-header">
          <h1>Festify 管理システム</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setCurrentView("dashboard")}
              className="logout-button"
              style={{ background: "#666" }}
            >
              ダッシュボードに戻る
            </button>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </div>
        </div>
        <AdminFestify onBack={() => setCurrentView("dashboard")} />
      </div>
    );
  }

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
          <h2>Festify ダッシュボード</h2>
          <p>システムに正常にログインしました！</p>
          <StatsCard stats={stats} loading={loadingStats} />

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
            <button
              className="action-button primary"
              onClick={() => setCurrentView("adminFestify")}
            >
              管理者画面
            </button>
            <button
              className="action-button secondary"
              onClick={() => setCurrentView("festifyList")}
            >
              Festifyリストを表示
            </button>
            <Link to="/settings" className="action-button secondary" style={{textAlign: 'center', textDecoration: 'none'}}>
                アカウント設定
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
