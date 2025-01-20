import React, { useContext } from 'react';
import { SavedItemsContext } from './SavedItemsContext';

function MyPage() {
  const { savedItems } = useContext(SavedItemsContext);

  return (
    <div className="my-page">
      <h2>관심 목록</h2>
      <div className="saved-items">
        {savedItems.map(item => (
          <div key={item.id} className="saved-item">
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPage;
