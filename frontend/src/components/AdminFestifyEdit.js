import React, { useState, useEffect } from "react";
import festifyService from "../services/festifyService";
import "../styles/AdminFestifyEdit.css";

const AdminFestifyEdit = ({ festify, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    department: "デザイン科",
    grade: "1",
    description: "",
    place_text: "",
    image1: "",
    image2: "",
    image3: "",
    place_image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (festify) {
      // Edit mode: populate form with existing data
      setFormData({
        title: festify.title || "",
        creator: festify.creator || "",
        department: festify.department || "デザイン科",
        grade: festify.grade?.toString() || "1",
        description: festify.description || "",
        place_text: festify.place_text || "",
        image1: festify.image1 || "",
        image2: festify.image2 || "",
        image3: festify.image3 || "",
        place_image: festify.place_image || "",
      });
    }
  }, [festify]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("作品名を入力してください");
      return;
    }
    if (!formData.creator.trim()) {
      setError("作成者名を入力してください");
      return;
    }

    try {
      setLoading(true);

      // Convert grade to integer
      const dataToSubmit = {
        ...formData,
        grade: parseInt(formData.grade, 10),
      };

      if (festify) {
        // Update existing festify
        await festifyService.updateFestify(festify.id, dataToSubmit);
        alert("更新しました");
      } else {
        // Create new festify
        await festifyService.createFestify(dataToSubmit);
        alert("追加しました");
      }

      if (onSave) {
        onSave();
      }
    } catch (err) {
      setError(festify ? "更新に失敗しました" : "追加に失敗しました");
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("変更を破棄しますか？")) {
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <div className="edit-section">
      <form className="edit-container" onSubmit={handleSubmit}>
        <h1>{festify ? "編集画面" : "新規作成画面"}</h1>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Work Images */}
        <div className="form-group">
          <label>作品の画像:</label>
          <div className="images">
            <div className="image-input-wrapper">
              <label className="add-image-label">画像1 URL</label>
              <input
                type="text"
                name="image1"
                value={formData.image1}
                onChange={handleInputChange}
                placeholder="画像1のURLを入力"
              />
              {formData.image1 && (
                <img
                  src={formData.image1}
                  alt="Preview 1"
                  className="image-preview"
                />
              )}
            </div>
            <div className="image-input-wrapper">
              <label className="add-image-label">画像2 URL</label>
              <input
                type="text"
                name="image2"
                value={formData.image2}
                onChange={handleInputChange}
                placeholder="画像2のURLを入力"
              />
              {formData.image2 && (
                <img
                  src={formData.image2}
                  alt="Preview 2"
                  className="image-preview"
                />
              )}
            </div>
            <div className="image-input-wrapper">
              <label className="add-image-label">画像3 URL</label>
              <input
                type="text"
                name="image3"
                value={formData.image3}
                onChange={handleInputChange}
                placeholder="画像3のURLを入力"
              />
              {formData.image3 && (
                <img
                  src={formData.image3}
                  alt="Preview 3"
                  className="image-preview"
                />
              )}
            </div>
          </div>
        </div>

        {/* Work Title */}
        <div className="form-group">
          <label htmlFor="title">作品名: *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="作品名を入力してください"
          />
        </div>

        {/* Creator Name */}
        <div className="form-group">
          <label htmlFor="creator">作成者名: *</label>
          <input
            type="text"
            id="creator"
            name="creator"
            value={formData.creator}
            onChange={handleInputChange}
            required
            placeholder="作成者名を入力してください"
          />
        </div>

        {/* Department */}
        <div className="form-group">
          <label>学科:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="dep-design"
                name="department"
                value="デザイン科"
                checked={formData.department === "デザイン科"}
                onChange={handleInputChange}
              />
              <label htmlFor="dep-design">デザイン科</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="dep-it"
                name="department"
                value="IT科"
                checked={formData.department === "IT科"}
                onChange={handleInputChange}
              />
              <label htmlFor="dep-it">IT科</label>
            </div>
          </div>
        </div>

        {/* Grade */}
        <div className="form-group">
          <label>学年:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="grade-1"
                name="grade"
                value="1"
                checked={formData.grade === "1"}
                onChange={handleInputChange}
              />
              <label htmlFor="grade-1">1年</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="grade-2"
                name="grade"
                value="2"
                checked={formData.grade === "2"}
                onChange={handleInputChange}
              />
              <label htmlFor="grade-2">2年</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="grade-3"
                name="grade"
                value="3"
                checked={formData.grade === "3"}
                onChange={handleInputChange}
              />
              <label htmlFor="grade-3">3年</label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">説明:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="作品の説明を入力してください"
          ></textarea>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="place_image">展示場所(画像):</label>
          <input
            type="text"
            id="place_image"
            name="place_image"
            value={formData.place_image}
            onChange={handleInputChange}
            placeholder="展示場所の画像URLを入力"
          />
          {formData.place_image && (
            <img
              src={formData.place_image}
              alt="Location Preview"
              className="image-preview location-preview"
            />
          )}

          <label htmlFor="place_text" style={{ marginTop: "15px" }}>
            展示場所(文字):
          </label>
          <input
            type="text"
            id="place_text"
            name="place_text"
            value={formData.place_text}
            onChange={handleInputChange}
            placeholder="展示場所を入力してください"
          />
        </div>

        {/* Action Buttons */}
        <div className="action-button">
          <button type="button" className="btn cancel" onClick={handleCancel}>
            キャンセル
          </button>
          <button type="submit" className="btn submit" disabled={loading}>
            {loading ? "処理中..." : festify ? "更新" : "追加"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFestifyEdit;
