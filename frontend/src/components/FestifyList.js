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
  // Load festifies when filters change
  // Consolidated fetch function
  const fetchFestifies = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      // If we have filters, use search endpoint
      if (searchKeyword.trim() || grade || department) {
          data = await festifyService.searchFestifies({
              keyword: searchKeyword,
              grade,
              department,
          });
      } else {
          // Otherwise fetch all
          data = await festifyService.getAllFestifies();
      }
      setFestifies(data);
    } catch (err) {
      setError("データの読み込みに失敗しました");
      console.error("Load festifies error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger fetch on filter change
  useEffect(() => {
    fetchFestifies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, department]);

  // Initial Check for permalink
  useEffect(() => {
    const checkPermalink = async () => {
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
    checkPermalink();
  }, []);

  const handleResetFilters = () => {
    setGrade("");
    setDepartment("");
    setSearchKeyword("");
    // The useEffect will trigger fetchFestifies
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchFestifies();
  };

  const handleViewDetails = async (festify) => {
    // Optimistically set the summary data first so the modal opens quickly
    setSelectedFestify(festify);
    setIsMapOpen(false);

    try {
        // Then fetch the full details
        const fullData = await festifyService.getFestifyById(festify.id);
        setSelectedFestify(fullData);
    } catch (err) {
        console.error("Failed to fetch full details", err);
        // We still have the summary data, so it's better than nothing.
    }
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
          <span>管理者ログイン</span>
          <User size={18} />
        </Link>
      </header>

      {/* B. Hero Section */}
      <section className="modern-hero">
        <h1 className="hero-title-large">フェスティバル2025へようこそ</h1>
        <p className="hero-slogan">創造。情熱。つながり。</p>
      </section>

      {/* C. Control Bar (Search & Chips) */}
      <div className="control-bar">
        <form onSubmit={handleSearch} className="search-pill-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="作品名、クラスで検索..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-pill-input"
          />
        </form>

        <div className="filter-chips-scroll">
          <button 
            className={`filter-chip ${!grade && !department ? 'active' : ''}`}
            onClick={handleResetFilters}
          >
            すべて
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
           <h3>結果が見つかりませんでした</h3>
           <p>別のキーワードで検索してみてください</p>
           {hasFilters && (
             <button 
               className="admin-login-btn" 
               style={{margin: '20px auto', background: '#ccc', color: 'white'}}
               onClick={handleResetFilters}
             >
               条件をクリア
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
                   <>
                     <img 
                        src={festify.image1} 
                        alt={festify.title} 
                        className="card-image"
                        onError={(e) => {
                            console.error("Image load error for", festify.title);
                            e.target.style.display = 'none';
                        }}
                     />
                     {/* Debug helper: Remove in production */}
                     {/* <div style={{fontSize: '10px', color: 'gray', padding: '2px'}}>Img Size: {festify.image1.length}</div> */}
                   </>
                 ) : (
                   <div style={{height: '200px', background: '#eee', display: 'flex', alignItems:'center', justifyContent:'center', color:'#999'}}>画像なし</div>
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
                {(festify.image2 || festify.image3) && (
                  <div className="card-thumbnails-row">
                    {[festify.image1, festify.image2, festify.image3].filter(Boolean).map((img, idx) => (
                      <div key={idx} className="thumb-wrapper">
                         <img src={img} alt="" className="card-thumb" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="card-badges">
                    <span className="badge-pill">{festify.department}</span>
                    <span className="badge-pill">{festify.grade}年</span>
                </div>
                <h3 className="card-title">{festify.title}</h3>
                <div className="card-author">
                    <Palette size={14} style={{marginRight: '4px'}} />
                    {festify.creator || "不明"}
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
                        <h3 className="section-title">作品について</h3>
                        <p className="detail-description">{selectedFestify.description}</p>
                    </div>

                    <div className="detail-section">
                        <h3 className="section-title">ギャラリー</h3>
                        <div className="detail-gallery-grid">
                            {[selectedFestify.image1, selectedFestify.image2, selectedFestify.image3].filter(Boolean).map((img, idx) => (
                                <img key={idx} src={img} alt={`Gallery ${idx+1}`} className="detail-gallery-img" />
                            ))}
                        </div>
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
                        <h3 className="postcard-title">アクセスチケット</h3>
                        <div className="postcard-content">
                            <p className="place-text">
                                <strong>📍 場所:</strong> {selectedFestify.place_text}
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
            title="会場マップ"
          />
       )}
    </div>
  );
};

export default FestifyList;
