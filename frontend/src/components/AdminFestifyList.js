import React, { useState, useEffect } from "react";
import festifyService from "../services/festifyService";
import "../styles/AdminFestifyList.css";

const AdminFestifyList = ({ onEdit, onViewDetails, onBack }) => {
  const [festifies, setFestifies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("データの読み込みに失敗しました");
      console.error("Load festifies error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("本当にこの作品を削除しますか？")) {
      try {
        await festifyService.deleteFestify(id);
        alert("削除しました");
        loadFestifies(); // Reload the list
      } catch (err) {
        alert("削除に失敗しました");
        console.error("Delete error:", err);
      }
    }
  };

  const handleAddNew = () => {
    if (onEdit) {
      onEdit(null); // null means create new
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Festify 管理者画面</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>名前</th>
              <th>学科</th>
              <th>学年</th>
              <th>作品名</th>
              <th>説明</th>
              <th>展示場所（文字）</th>
              <th>展示場所（画像）</th>
              <th>写真1</th>
              <th>写真2</th>
              <th>写真3</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {festifies.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  データがありません
                </td>
              </tr>
            ) : (
              festifies.map((festify) => (
                <tr key={festify.id}>
                  <td>{festify.creator || "N/A"}</td>
                  <td>{festify.department || "N/A"}</td>
                  <td>{festify.grade || "N/A"}</td>
                  <td>{festify.title || "N/A"}</td>
                  <td>
                    <div className="description-cell">
                      {festify.description
                        ? festify.description.substring(0, 30) + "..."
                        : "N/A"}
                    </div>
                  </td>
                  <td>{festify.place_text || "N/A"}</td>
                  <td>
                    {festify.place_image ? (
                      <img
                        src={festify.place_image}
                        alt="展示場所"
                        className="small-img"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {festify.image1 ? (
                      <img
                        src={festify.image1}
                        alt="写真1"
                        className="small-img"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {festify.image2 ? (
                      <img
                        src={festify.image2}
                        alt="写真2"
                        className="small-img"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {festify.image3 ? (
                      <img
                        src={festify.image3}
                        alt="写真3"
                        className="small-img"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit"
                        onClick={() => onEdit && onEdit(festify)}
                      >
                        編集
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(festify.id)}
                      >
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="button-area">
        <button className="add" onClick={handleAddNew}>
          新規追加
        </button>
        <button className="back" onClick={onBack}>
          戻る
        </button>
      </div>
    </div>
  );
};

export default AdminFestifyList;
