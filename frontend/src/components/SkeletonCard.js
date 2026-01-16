import React from 'react';
import '../styles/SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-text skeleton-title">
             <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-text skeleton-subtitle">
             <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-text skeleton-badge">
             <div className="skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
