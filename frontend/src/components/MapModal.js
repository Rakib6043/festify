import React from "react";
import "../styles/MapModal.css";

const MapModal = ({ isOpen, onClose, x, y, title }) => {
  if (!isOpen) return null;

  // Placeholder map image
  const mapImage = "https://placehold.co/800x600?text=School+Map"; 
  // Note: Using placehold.co or similar as valid placeholder. 
  // In real app, this should be imported from assets.

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="map-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{title} - 場所</h2>
        <div className="map-container" style={{ position: "relative", width: "100%", height: "auto" }}>
            <img src={mapImage} alt="School Map" style={{ width: "100%", display: "block" }} />
            {x !== null && y !== null && (
                <div 
                    className="map-pin"
                    style={{
                        position: "absolute",
                        top: `${y}%`,
                        left: `${x}%`,
                        transform: "translate(-50%, -100%)", // Pin point at bottom center
                        color: "red",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textShadow: "0 2px 2px rgba(0,0,0,0.5)"
                    }}
                >
                    📍
                </div>
            )}
        </div>
        <div className="map-instructions">
            <p>ピンの位置が展示場所です。</p>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
