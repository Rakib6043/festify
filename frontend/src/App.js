import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AccountSettings from "./components/AccountSettings";
import "./styles/App.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
     return (
        <div className="loading-container">
           <div className="loading-spinner"></div>
           <p>読み込み中...</p>
        </div>
     );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    
    if (loading) return null; // Or spinner
    
    return isAuthenticated ? <Navigate to="/" /> : children;
}

function App() {
  return (
    <Router>
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                             {/* Assuming Dashboard has a layout, or we wrap AccountSettings in a layout. 
                                 For now, let's render it directly, but we might want a 'Back to Dashboard' button in it 
                                 or render it INSIDE Dashboard if Dashboard handles the Sidebar?
                                 
                                 Looking at Dashboard.js (previous knowledge), it likely renders `AdminFestify` or `FestifyList` based on role.
                                 If I want Settings to be a separate page, this Route is fine.
                                 Let's allow independent navigation for now.
                             */}
                             <div className="dashboard-layout">
                                <header className="app-header" style={{background: '#333', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <h2>Festify Board</h2>
                                    <a href="/" style={{color: 'white', textDecoration: 'none'}}>←ダッシュボードに戻る</a>
                                </header>
                                <AccountSettings />
                             </div>
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
