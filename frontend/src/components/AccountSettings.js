import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/AccountSettings.css';

const AccountSettings = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    grade: '',
    password: '',
    password_confirmation: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
        setFormData(prev => ({
            ...prev,
            id: user.id,
            name: user.name || '',
            email: user.email || '',
            department: user.department || '',
            grade: user.grade || ''
        }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    // Validate password if provided
    if (formData.password && formData.password !== formData.password_confirmation) {
        setMessage({ type: 'error', text: 'パスワードが一致しません' });
        return;
    }

    try {
      setLoading(true);
      // Clean up empty passwords before sending? Backend handles logic.
      // Assuming backend ignores empty password update if not provided/nil.
      // But typically Rails `has_secure_password` validates presence on create, 
      // allows nil on update unless validation says otherwise.
      
      const updateData = { ...formData };
      if (!updateData.password) {
          delete updateData.password;
          delete updateData.password_confirmation;
      }

      await updateUserProfile(updateData);
      setMessage({ type: 'success', text: 'プロフィールを更新しました！' });
      // Clear password fields
      setFormData(prev => ({ ...prev, password: '', password_confirmation: '' }));
    } catch (err) {
      setMessage({ type: 'error', text: err.message || '更新に失敗しました' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>ログインが必要です</div>;

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>アカウント設定</h2>
        
        {message.text && (
            <div className={`message ${message.type}`}>
                {message.text}
            </div>
        )}

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>お名前</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
                <label>学科</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">選択してください</option>
                    <option value="IT科">IT科</option>
                    <option value="デザイン科">デザイン科</option>
                </select>
            </div>
            <div className="form-group">
                <label>学年</label>
                <select name="grade" value={formData.grade} onChange={handleChange}>
                    <option value="">選択してください</option>
                    <option value="1">1年</option>
                    <option value="2">2年</option>
                    <option value="3">3年</option>
                </select>
            </div>
          </div>

          <div className="password-section">
            <h3>パスワード変更 (任意)</h3>
            <div className="form-group">
                <label>新しいパスワード</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="変更しない場合は空欄"
                minLength="6"
                />
            </div>
            
            <div className="form-group">
                <label>パスワード確認</label>
                <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="変更しない場合は空欄"
                />
            </div>
          </div>

          <button type="submit" className="save-button" disabled={loading}>
            {loading ? '保存中...' : '変更を保存'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
