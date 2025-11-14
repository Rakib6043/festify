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
  const [imagePreview1, setImagePreview1] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const [imagePreview3, setImagePreview3] = useState("");
  const [placeImagePreview, setPlaceImagePreview] = useState("");

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
      // Set existing image previews
      setImagePreview1(festify.image1 || "");
      setImagePreview2(festify.image2 || "");
      setImagePreview3(festify.image3 || "");
      setPlaceImagePreview(festify.place_image || "");
    }
  }, [festify]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("画像ファイルを選択してください");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("ファイルサイズは5MB以下にしてください");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        
        if (imageNumber === 1) {
          setImagePreview1(base64String);
          setFormData((prev) => ({ ...prev, image1: base64String }));
        } else if (imageNumber === 2) {
          setImagePreview2(base64String);
          setFormData((prev) => ({ ...prev, image2: base64String }));
        } else if (imageNumber === 3) {
          setImagePreview3(base64String);
          setFormData((prev) => ({ ...prev, image3: base64String }));
        } else if (imageNumber === "place") {
          setPlaceImagePreview(base64String);
          setFormData((prev) => ({ ...prev, place_image: base64String }));
        }
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (imageNumber) => {
    if (imageNumber === 1) {
      setImagePreview1("");
      setFormData((prev) => ({ ...prev, image1: "" }));
    } else if (imageNumber === 2) {
      setImagePreview2("");
      setFormData((prev) => ({ ...prev, image2: "" }));
    } else if (imageNumber === 3) {
      setImagePreview3("");
      setFormData((prev) => ({ ...prev, image3: "" }));
    } else if (imageNumber === "place") {
      setPlaceImagePreview("");
      setFormData((prev) => ({ ...prev, place_image: "" }));
    }
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
            {/* Image 1 */}
            <div className="image-input-wrapper">
              <label className="add-image-label">画像1</label>
              {!imagePreview1 ? (
                <label htmlFor="image1-upload" className="file-upload-label">
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">画像を選択</span>
                  </div>
                </label>
              ) : (
                <div className="image-preview-container">
                  <img
                    src={imagePreview1}
                    alt="Preview 1"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(1)}
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image1-upload"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 1)}
                style={{ display: "none" }}
              />
            </div>

            {/* Image 2 */}
            <div className="image-input-wrapper">
              <label className="add-image-label">画像2</label>
              {!imagePreview2 ? (
                <label htmlFor="image2-upload" className="file-upload-label">
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">画像を選択</span>
                  </div>
                </label>
              ) : (
                <div className="image-preview-container">
                  <img
                    src={imagePreview2}
                    alt="Preview 2"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(2)}
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image2-upload"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 2)}
                style={{ display: "none" }}
              />
            </div>

            {/* Image 3 */}
            <div className="image-input-wrapper">
              <label className="add-image-label">画像3</label>
              {!imagePreview3 ? (
                <label htmlFor="image3-upload" className="file-upload-label">
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">画像を選択</span>
                  </div>
                </label>
              ) : (
                <div className="image-preview-container">
                  <img
                    src={imagePreview3}
                    alt="Preview 3"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(3)}
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image3-upload"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 3)}
                style={{ display: "none" }}
              />
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
          {!placeImagePreview ? (
            <label htmlFor="place-image-upload" className="file-upload-label">
              <div className="upload-placeholder">
                <span className="upload-icon">+</span>
                <span className="upload-text">場所画像を選択</span>
              </div>
            </label>
          ) : (
            <div className="image-preview-container">
              <img
                src={placeImagePreview}
                alt="Location Preview"
                className="image-preview location-preview"
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => removeImage("place")}
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            id="place-image-upload"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "place")}
            style={{ display: "none" }}
          />

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
