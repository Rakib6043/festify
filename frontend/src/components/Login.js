import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);
      if (response.status === "success") {
        login(response.user);
        // Redirect or update UI as needed
        console.log("Login successful!", response.user);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Hero Section */}
      <div className="auth-hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Festify 2026</h1>
          <p className="hero-subtitle">
            学園祭のすべてが、ここに。
            <br />
            プロジェクトの探索、投票、そして新しい発見を。
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="auth-form-container">
        <div className="auth-glass-card">
          <h2 className="auth-title">ログイン</h2>
          <p className="auth-desc">アカウントにサインインしてください</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="auth-input-group">
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="auth-input"
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              アカウントをお持ちでない方は <Link to="/register">新規登録</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
