import React, { useState, useEffect } from "react";
import festifyService from "../services/festifyService";
import "../styles/FestifyList.css";

const FestifyList = () => {
  const [festifies, setFestifies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFestify, setSelectedFestify] = useState(null);

  // Load festifies when component mounts
  useEffect(() => {
    loadFestifies();
  }, []);

  const loadFestifies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await festifyService.getAllFestifies();
      setFestifies(data);
    } catch (err) {
      setError("フェスティファイの読み込みに失敗しました");
      console.error("Load festifies error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      loadFestifies();
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await festifyService.searchFestifies(searchKeyword);
      setFestifies(data);
    } catch (err) {
      setError("検索に失敗しました");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (festify) => {
    setSelectedFestify(festify);
  };

  const handleCloseDetails = () => {
    setSelectedFestify(null);
  };

  if (loading) {
    return (
      <div className="festify-list-container">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="festify-list-container">
      <div className="festify-list-header">
        <h1>フェスティファイ一覧</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="タイトルまたは説明で検索..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            検索
          </button>
          {searchKeyword && (
            <button
              type="button"
              onClick={() => {
                setSearchKeyword("");
                loadFestifies();
              }}
              className="clear-button"
            >
              クリア
            </button>
          )}
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {festifies.length === 0 ? (
        <div className="no-data">
          <p>フェスティファイが見つかりませんでした</p>
        </div>
      ) : (
        <div className="festify-grid">
          {festifies.map((festify) => (
            <div key={festify.id} className="festify-card">
              <div className="festify-image">
                {festify.image1 ? (
                  <img src={festify.image1} alt={festify.title} />
                ) : (
                  <div className="no-image">画像なし</div>
                )}
              </div>
              <div className="festify-content">
                <h3 className="festify-title">{festify.title}</h3>
                <p className="festify-description">
                  {festify.description?.substring(0, 100)}
                  {festify.description?.length > 100 ? "..." : ""}
                </p>
                <div className="festify-meta">
                  <span className="meta-item">
                    <strong>作成者:</strong> {festify.creator || "N/A"}
                  </span>
                  <span className="meta-item">
                    <strong>学科:</strong> {festify.department || "N/A"}
                  </span>
                  <span className="meta-item">
                    <strong>学年:</strong> {festify.grade || "N/A"}
                  </span>
                </div>
                <button
                  onClick={() => handleViewDetails(festify)}
                  className="view-details-button"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedFestify && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseDetails}>
              ×
            </button>
            <h2>{selectedFestify.title}</h2>
            <div className="modal-images">
              {selectedFestify.image1 && (
                <img src={selectedFestify.image1} alt="Image 1" />
              )}
              {selectedFestify.image2 && (
                <img src={selectedFestify.image2} alt="Image 2" />
              )}
              {selectedFestify.image3 && (
                <img src={selectedFestify.image3} alt="Image 3" />
              )}
            </div>
            <div className="modal-details">
              <p>
                <strong>説明:</strong> {selectedFestify.description}
              </p>
              <p>
                <strong>作成者:</strong> {selectedFestify.creator}
              </p>
              <p>
                <strong>学科:</strong> {selectedFestify.department}
              </p>
              <p>
                <strong>学年:</strong> {selectedFestify.grade}
              </p>
              <p>
                <strong>場所:</strong> {selectedFestify.place_text}
              </p>
              {selectedFestify.place_image && (
                <div className="place-image">
                  <strong>場所の画像:</strong>
                  <img src={selectedFestify.place_image} alt="Place" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FestifyList;
