import React, { useState, useEffect } from "react";
import festifyService from "../services/festifyService";
import "../styles/FestifyDetails.css";

const FestifyDetails = ({ festifyId, onBack, onDelete }) => {
  const [festify, setFestify] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (festifyId) {
      loadFestify();
    }
  }, [festifyId]);

  const loadFestify = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await festifyService.getFestifyById(festifyId);
      setFestify(data);
    } catch (err) {
      setError("作品の読み込みに失敗しました");
      console.error("Load festify error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("本当にこの作品を削除しますか？")) {
      try {
        await festifyService.deleteFestify(festifyId);
        alert("削除しました");
        if (onDelete) {
          onDelete();
        }
      } catch (err) {
        alert("削除に失敗しました");
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  if (error || !festify) {
    return (
      <div className="detail-container">
        <div className="error-message">{error || "作品が見つかりません"}</div>
        {onBack && (
          <button onClick={onBack} className="back-button">
            戻る
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="detail-container">
      <h1>作品詳細</h1>

      {/* Main Image */}
      <div className="image-block">
        <h2>作品画像</h2>
        {festify.image1 ? (
          <img src={festify.image1} alt="作品画像" className="main-image" />
        ) : (
          <div className="no-image">画像がありません</div>
        )}
      </div>

      {/* Additional Images */}
      {(festify.image2 || festify.image3) && (
        <div className="additional-images">
          {festify.image2 && (
            <img
              src={festify.image2}
              alt="作品画像2"
              className="additional-image"
            />
          )}
          {festify.image3 && (
            <img
              src={festify.image3}
              alt="作品画像3"
              className="additional-image"
            />
          )}
        </div>
      )}

      {/* Details */}
      <div className="details-info">
        <p>
          <strong>作成者名：</strong> {festify.creator || "N/A"}
        </p>

        <p>
          <strong>作品名：</strong> {festify.title || "N/A"}
        </p>

        <p>
          <strong>学科：</strong> {festify.department || "N/A"}
        </p>

        <p>
          <strong>学年：</strong> {festify.grade || "N/A"}
        </p>

        <p>
          <strong>説明：</strong>
          <br />
          {festify.description || "N/A"}
        </p>

        <p>
          <strong>展示場所：</strong> {festify.place_text || "N/A"}
        </p>
      </div>

      {/* Location Image */}
      {festify.place_image && (
        <div className="image-block">
          <h2>展示場所画像</h2>
          <img
            src={festify.place_image}
            alt="展示場所画像"
            className="location-image"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons-container">
        {onBack && (
          <button onClick={onBack} className="back-button">
            戻る
          </button>
        )}
        <button onClick={handleDelete} className="delete-button">
          この作品を削除
        </button>
      </div>
    </div>
  );
};

export default FestifyDetails;
