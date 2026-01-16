import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import festifyService from "../services/festifyService";
import MapModal from "./MapModal";
import SkeletonCard from "./SkeletonCard";
import "../styles/FestifyList.css";
import { Heart, Search, Map, User, Palette, X } from "lucide-react";

const FestifyList = () => {
  const [festifies, setFestifies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedFestify, setSelectedFestify] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Load festifies when component mounts
  useEffect(() => {
    const init = async () => {
        await loadFestifies();
        
        // Check for permalink
        const params = new URLSearchParams(window.location.search);
        const permalinkId = params.get("id");
        if (permalinkId) {
            try {
                const data = await festifyService.getFestifyById(permalinkId);
                setSelectedFestify(data);
            } catch (err) {
                console.error("Failed to load permalink festify", err);
            }
        }
    };
    init();
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
    if (!searchKeyword.trim() && !grade && !department) {
      loadFestifies();
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await festifyService.searchFestifies({
        keyword: searchKeyword,
        grade,
        department,
      });
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
    setIsMapOpen(false);
  };

  const handleVote = async (id) => {
    try {
      const response = await festifyService.voteFestify(id);
      const updatedFestify = response.data;
      
      setFestifies(festifies.map(f => f.id === id ? updatedFestify : f));
      if (selectedFestify && selectedFestify.id === id) {
        setSelectedFestify(updatedFestify);
      }
    } catch (err) {
      alert("投票に失敗しました");
      console.error("Vote error:", err);
    }
  };

  if (loading) {
    return (
      <div className="festify-list-container">
        {/* Render header during loading for consistency, or just the grid */}
         <div className="hero-banner">
            <h1>🎉 Welcome to School Festival 2024! 🎨</h1>
             <p>読み込み中...</p>
         </div>
         <div className="festify-grid">
           {[...Array(6)].map((_, i) => (
             <SkeletonCard key={i} />
           ))}
         </div>
      </div>
    );
  }

  // Check if we have active filters
  const hasFilters = searchKeyword || grade || department;

  return (
    <div className="festify-list-container">
      {/* A. Sticky Glass Header */}
      <header className="sticky-glass-header">
        <Link to="/" className="header-logo">Festify</Link>
        <Link to="/login" className="admin-login-btn">
          <span>Admin Login</span>
          <User size={18} />
        </Link>
      </header>

      {/* B. Hero Section */}
      <section className="modern-hero">
        <h1 className="hero-title-large">Khám phá Lễ hội 2025</h1>
        <p className="hero-slogan">Sáng tạo. Đam mê. Kết nối.</p>
      </section>

      {/* C. Control Bar (Search & Chips) */}
      <div className="control-bar">
        <form onSubmit={handleSearch} className="search-pill-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Tìm tên tranh, lớp..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-pill-input"
          />
        </form>

        <div className="filter-chips-scroll">
          <button 
            className={`filter-chip ${!grade && !department ? 'active' : ''}`}
            onClick={() => { setGrade(""); setDepartment(""); setSearchKeyword(""); loadFestifies(); }}
          >
            Tất cả
          </button>
          <button 
            className={`filter-chip ${department === "IT科" ? 'active' : ''}`}
            onClick={() => { setDepartment("IT科"); setGrade(""); }}
          >
            IT科
          </button>
          <button 
            className={`filter-chip ${department === "デザイン科" ? 'active' : ''}`}
            onClick={() => { setDepartment("デザイン科"); setGrade(""); }}
          >
            デザイン科
          </button>
           <button 
            className={`filter-chip ${grade === "1" ? 'active' : ''}`}
            onClick={() => { setGrade("1"); setDepartment(""); }}
          >
            1年
          </button>
          <button 
            className={`filter-chip ${grade === "2" ? 'active' : ''}`}
            onClick={() => { setGrade("2"); setDepartment(""); }}
          >
            2年
          </button>
          <button 
            className={`filter-chip ${grade === "3" ? 'active' : ''}`}
            onClick={() => { setGrade("3"); setDepartment(""); }}
          >
            3年
          </button>
        </div>
      </div>

      {error && <div className="error-message" style={{textAlign: 'center', color: 'red'}}>{error}</div>}

      {/* D. Masonry Grid */}
      {loading ? (
        <div className="masonry-grid">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="skeleton-masonry" style={{height: `${Math.random() * 100 + 200}px`}}></div>
           ))}
        </div>
      ) : festifies.length === 0 ? (
        <div className="empty-state">
           <span className="empty-illustration">🐱🔍</span>
           <h3>Không tìm thấy kết quả</h3>
           <p>Thử tìm từ khóa khác xem sao nhé!</p>
           {hasFilters && (
             <button 
               className="admin-login-btn" 
               style={{margin: '20px auto', background: '#ccc', color: 'white'}}
               onClick={() => {
                 setSearchKeyword("");
                 setGrade("");
                 setDepartment("");
                 loadFestifies();
               }}
             >
               Xóa bộ lọc
             </button>
           )}
        </div>
      ) : (
        <div className="masonry-grid">
          {festifies.map((festify) => (
            <div 
                key={festify.id} 
                className="artwork-card"
                onClick={() => handleViewDetails(festify)}
            >
              <div className="card-image-wrapper">
                 {festify.image1 ? (
                   <img src={festify.image1} alt={festify.title} className="card-image" />
                 ) : (
                   <div style={{height: '200px', background: '#eee', display: 'flex', alignItems:'center', justifyContent:'center', color:'#999'}}>No Image</div>
                 )}
                 <button 
                    className={`floating-like-btn ${festify.isLiked ? 'liked' : ''}`} // Assuming local state for liked visual, or just visual
                    onClick={(e) => {
                        e.stopPropagation();
                        handleVote(festify.id);
                    }}
                 >
                    <Heart size={20} fill={festify.likes > 0 ? "currentColor" : "none"} />
                 </button>
              </div>
              
              <div className="card-content">
                <div className="card-badges">
                    <span className="badge-pill">{festify.department}</span>
                    <span className="badge-pill">{festify.grade}年</span>
                </div>
                <h3 className="card-title">{festify.title}</h3>
                <div className="card-author">
                    <Palette size={14} style={{marginRight: '4px'}} />
                    {festify.creator || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB Map */}
      <button className="fab-map" onClick={() => setIsMapOpen(true)}>
          <Map size={24} />
      </button>

      {/* Detail Modal (Keep existing logic, just ensure classes match if needed) */}
      {selectedFestify && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content immersive-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-immersive" onClick={handleCloseDetails}>
              <X size={24} />
            </button>
            
            <div 
                className="immersive-header" 
                style={{ backgroundImage: `url(${selectedFestify.image1 || ''})` }}
            >
                <div className="header-overlay"></div>
                <div className="header-title-area">
                    <h2 className="detail-title">{selectedFestify.title}</h2>
                    <p className="detail-subtitle">by {selectedFestify.creator}</p>
                </div>
            </div>

            <div className="detail-content-wrapper">
                <div className="detail-main">
                    <div className="detail-section">
                        <h3 className="section-title">About this work</h3>
                        <p className="detail-description">{selectedFestify.description}</p>
                    </div>

                    <div className="detail-meta-grid">
                        <div className="meta-pill">
                            <span className="label">学科</span>
                            <span className="value">{selectedFestify.department}</span>
                        </div>
                        <div className="meta-pill">
                            <span className="label">学年</span>
                            <span className="value">{selectedFestify.grade}年</span>
                        </div>
                    </div>
                </div>

                <div className="detail-sidebar">
                    <div className="postcard-container">
                        <div className="postcard-stamp">
                            <div className="stamp-inner">
                                <span>{selectedFestify.grade}-{selectedFestify.department === 'IT科' ? 'IT' : 'DS'}</span>
                            </div>
                        </div>
                        <h3 className="postcard-title">Location Ticket</h3>
                        <div className="postcard-content">
                            <p className="place-text">
                                <strong>📍 Place:</strong> {selectedFestify.place_text}
                            </p>
                            
                            <button 
                                onClick={() => setIsMapOpen(true)}
                                className="map-button-postcard"
                            >
                                🗺 地図で確認する
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={() => handleVote(selectedFestify.id)}
                        className="vote-button-large"
                    >
                        <Heart size={20} fill="white" style={{marginRight: '8px'}} />
                        いいね！を送る <span className="like-count">({selectedFestify.likes || 0})</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

       {/* Map Modal */}
       {selectedFestify && (
        <MapModal 
            isOpen={isMapOpen} 
            onClose={() => setIsMapOpen(false)} 
            x={selectedFestify.map_x} 
            y={selectedFestify.map_y} 
            title={selectedFestify.title}
        />
       )}
       
       {/* Global Map Modal (from FAB) */}
       {!selectedFestify && (
          <MapModal
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            // Default center or special logic for full map
            title="School Map"
          />
       )}
    </div>
  );
};

export default FestifyList;
