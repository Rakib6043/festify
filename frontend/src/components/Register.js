import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    department: '',
    grade: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
        setError('パスワードが一致しません (Passwords do not match)');
        return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      navigate('/'); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message || '登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Hero Section */}
      <div className="auth-hero">
        <div className="hero-content">
          <h1 className="hero-title">Join the Community</h1>
          <p className="hero-subtitle">
            あなたの作品を世界へ。<br/>
            Festifyコミュニティに参加して、<br/>
            創造性を共有しましょう。
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="auth-form-container">
        <div className="auth-glass-card" style={{ maxWidth: '550px' }}>
          <h2 className="auth-title">新規登録</h2>
          <p className="auth-desc">Festifyのアカウントを作成しよう</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>お名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
                className="auth-input"
              />
            </div>
            
            <div className="auth-input-group">
              <label>メールアドレス</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@festify.com"
                className="auth-input"
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: '600' }}>学科</label>
                  <select 
                    name="department" 
                    value={formData.department} 
                    onChange={handleChange}
                    className="auth-input"
                    required
                  >
                      <option value="">選択</option>
                      <option value="IT科">IT科</option>
                      <option value="デザイン科">デザイン科</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#444', fontWeight: '600' }}>学年</label>
                  <select 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange}
                    className="auth-input"
                    required
                  >
                      <option value="">選択</option>
                      <option value="1">1年</option>
                      <option value="2">2年</option>
                      <option value="3">3年</option>
                  </select>
              </div>
            </div>

            <div className="auth-input-group">
              <label>パスワード</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="6文字以上"
                className="auth-input"
              />
            </div>
            
            <div className="auth-input-group">
              <label>パスワード確認</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="もう一度入力"
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? '登録中...' : 'アカウント作成'}
            </button>
          </form>
          
          <div className="auth-footer">
            すでにアカウントをお持ちですか？ <Link to="/login">ログインはこちら</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
