import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/QRCodeModal.css";

const QRCodeModal = ({ isOpen, onClose, festifyId, title }) => {
  if (!isOpen || !festifyId) return null;

  // Permalink URL: current origin + query param
  const permalink = `${window.location.origin}/?id=${festifyId}`;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>"{title}" のQRコード</h2>
        <div className="qr-container">
            <QRCodeCanvas value={permalink} size={256} level={"H"} includeMargin={true} />
        </div>
        <p className="qr-url-text">
            {permalink}
        </p>
        <button className="print-button" onClick={() => window.print()}>
            印刷する
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
