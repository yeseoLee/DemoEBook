import React, { useState, useEffect, useContext } from 'react';
import { SavedItemsContext } from './SavedItemsContext';
import './ShortsView.css';

function ShortsView() {
  const [currentPage, setCurrentPage] = useState(0);
  const { savedItems, setSavedItems } = useContext(SavedItemsContext);

  const posts = [
    { id: 1, text: "내가 전도준의 몸으로 태어난 건..." },
    { id: 2, text: "이번 생은 나에게 기회다." },
    { id: 3, text: "꿈을 이루는 과정..." }
  ];

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        setCurrentPage(prev => Math.min(prev + 1, posts.length - 1));
      } else {
        setCurrentPage(prev => Math.max(prev - 1, 0));
      }
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setCurrentPage(prev => Math.min(prev + 1, posts.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setCurrentPage(prev => Math.max(prev - 1, 0));
          break;
        default:
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [posts.length]);

  const handleLike = () => {
    alert('좋아요를 눌렀습니다!');
  };

  const handleShare = () => {
    alert('공유하기를 눌렀습니다!');
  };

  const handleSave = (post) => {
    if (!savedItems.find(item => item.id === post.id)) {
      setSavedItems(prev => [...prev, post]);
      alert('저장되었습니다!');
    } else {
      alert('이미 저장된 항목입니다!');
    }
  };

  return (
    <div className="shorts-container">
      <div
        className="shorts-page"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}
      >
        {posts.map(post => (
          <div key={post.id} className="shorts-card">
            <div className="card-content">
              <p>{post.text}</p>
            </div>
            <div className="interaction-buttons">
              <button onClick={handleLike} className="icon-button">
                <span>👍</span>
                <span className="count">124</span>
              </button>
              <button onClick={() => handleSave(post)} className="icon-button">
                <span>🔖</span>
                <span className="count">31</span>
              </button>
              <button onClick={handleShare} className="icon-button">
                <span>📫</span>
                <span className="count">65</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortsView;
