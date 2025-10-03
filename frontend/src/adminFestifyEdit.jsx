import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminFestifyEdit.css';

function AdminFestifyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [department, setDepartment] = useState('デザイン科');
  const [grade, setGrade] = useState(1);
  const [description, setDescription] = useState('');
  const [place_text, setPlaceText] = useState('');

  const [selectedImages, setSelectedImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    place_image: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    place_image: null,
  });

  const [targetImageSlot, setTargetImageSlot] = useState(null);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState([]);
  const isEditing = id !== undefined;

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`http://127.0.0.1:3000/api/v1/festifies/${id}`)
        .then((res) => {
          const work = res.data;
          setTitle(work.title);
          setCreator(work.creator);
          setDepartment(work.department);
          setGrade(work.grade);
          setDescription(work.description);
          setPlaceText(work.place_text);
          setImagePreviews({
            image1: work.image1_url,
            image2: work.image2_url,
            image3: work.image3_url,
            place_image: work.place_image_url,
          });
        })
        .catch((err) => {
          console.error('データの取得に失敗しました', err);
          setErrors([
            'データの取得に失敗しました。ページを再読み込みしてください。',
          ]);
        });
    }
  }, [id, isEditing]);

  const handleImageClick = (slot) => {
    setTargetImageSlot(slot);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImages((prev) => ({ ...prev, [targetImageSlot]: file }));
    setImagePreviews((prev) => ({
      ...prev,
      [targetImageSlot]: URL.createObjectURL(file),
    }));
    e.target.value = null;
  };

  const handleRemoveImage = (e, slot) => {
    e.stopPropagation();
    setImagePreviews((prev) => ({ ...prev, [slot]: null }));
    setSelectedImages((prev) => ({ ...prev, [slot]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    formData.append('festify[title]', title);
    formData.append('festify[creator]', creator);
    formData.append('festify[department]', department);
    formData.append('festify[grade]', grade);
    formData.append('festify[description]', description);
    formData.append('festify[place_text]', place_text);

    if (selectedImages.image1)
      formData.append('festify[image1]', selectedImages.image1);
    if (selectedImages.image2)
      formData.append('festify[image2]', selectedImages.image2);
    if (selectedImages.image3)
      formData.append('festify[image3]', selectedImages.image3);
    if (selectedImages.place_image)
      formData.append('festify[place_image]', selectedImages.place_image);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (isEditing) {
        await axios.patch(
          `http://127.0.0.1:3000/api/v1/festifies/${id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          'http://127.0.0.1:3000/api/v1/festifies',
          formData,
          config
        );
      }
      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(['予期せぬエラーが発生しました。']);
      }
    }
  };

  return (
    <div className="EditSection">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden-file-input"
        accept="image/*"
      />
      <form className="container" onSubmit={handleSubmit}>
        <h1>{isEditing ? '編集' : '新規作成'}</h1>

        {errors.length > 0 && (
          <div className="error-message">
            <p>入力内容にエラーがあります</p>
            <ul>
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
          <label>作品の画像:</label>
          <div className="images">
            {['image1', 'image2', 'image3'].map((slot) => (
              <div key={slot} className="image-container">
                {imagePreviews[slot] ? (
                  <>
                    <div className="image-preview-wrapper">
                      <img
                        src={imagePreviews[slot]}
                        alt="作品プレビュー"
                        className="image-preview"
                      />
                    </div>
                    <button
                      type="button"
                      className="delete-image-button"
                      onClick={(e) => handleRemoveImage(e, slot)}
                    >
                      削除
                    </button>
                  </>
                ) : (
                  <div
                    className="add-image-button"
                    onClick={() => handleImageClick(slot)}
                  >
                    <span>+</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="work-title">作品名:</label>
          <input
            id="work-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="creator-name">作成者名:</label>
          <input
            id="creator-name"
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>学科:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                name="department"
                value="デザイン科"
                checked={department === 'デザイン科'}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="dep-design">デザイン科</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                name="department"
                value="IT科"
                checked={department === 'IT科'}
                onChange={(e) => setDepartment(e.target.value)}
              />
              <label htmlFor="dep-it">IT科</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>学年:</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                name="grade"
                value={1}
                checked={grade === 1}
                onChange={(e) => setGrade(Number(e.target.value))}
              />
              <label htmlFor="grade-1">1年</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                name="grade"
                value={2}
                checked={grade === 2}
                onChange={(e) => setGrade(Number(e.target.value))}
              />
              <label htmlFor="grade-2">2年</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">説明:</label>
          <textarea
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>展示場所(画像):</label>
          <div className="image-wrapper-single">
            <div className="image-container">
              {imagePreviews.place_image ? (
                <>
                  <div className="image-preview-wrapper">
                    <img
                      src={imagePreviews.place_image}
                      alt="展示場所プレビュー"
                      className="image-preview"
                    />
                  </div>
                  <button
                    type="button"
                    className="delete-image-button"
                    onClick={(e) => handleRemoveImage(e, 'place_image')}
                  >
                    削除
                  </button>
                </>
              ) : (
                <div
                  className="add-image-button"
                  onClick={() => handleImageClick('place_image')}
                >
                  <span>+</span>
                </div>
              )}
            </div>
          </div>

          <label htmlFor="location-text">展示場所(文字):</label>
          <input
            id="location-text"
            type="text"
            value={place_text}
            onChange={(e) => setPlaceText(e.target.value)}
          />
        </div>

        <div className="action-button">
          <button type="submit" className="btn">
            {isEditing ? '更新' : '追加'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminFestifyEdit;
