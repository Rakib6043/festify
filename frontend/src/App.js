import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="App">{isAuthenticated ? <Dashboard /> : <Login />}</div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
