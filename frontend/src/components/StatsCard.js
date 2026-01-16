import React from "react";
import "../styles/StatsCard.css";

const StatsCard = ({ stats, loading }) => {
  if (loading) {
    return <div className="stats-card loading">読み込み中...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="stats-container">
      {/* 1. Total Projects */}
      <div className="stat-card pastel-blue">
        <div className="stat-value">{stats.total_projects}</div>
        <div className="stat-label">総作品数</div>
      </div>

      {/* 2. Design Dept */}
      <div className="stat-card pastel-pink">
        <div className="stat-value">{stats.by_department?.['デザイン科'] || 0}</div>
        <div className="stat-label">デザイン科</div>
      </div>

      {/* 3. IT Dept */}
      <div className="stat-card pastel-green">
        <div className="stat-value">{stats.by_department?.['IT科'] || 0}</div>
        <div className="stat-label">IT科</div>
      </div>
    </div>
  );
};

export default StatsCard;
