import React, { createContext, useState } from 'react';

export const SavedItemsContext = createContext();

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  return (
    <SavedItemsContext.Provider value={{ savedItems, setSavedItems }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
