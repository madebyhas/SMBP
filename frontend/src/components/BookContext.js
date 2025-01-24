"use client";

import { createContext, useContext, useState } from "react";

// Context
const BookContext = createContext();

// Provider
export const BookProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(null); // State untuk menyimpan buku yang dipilih

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook untuk mengakses context
export const useBookContext = () => useContext(BookContext);
