import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useBookContext } from "@/components/BookContext";

const Card = ({ books }) => {
  const { setSelectedBook } = useBookContext();

  // State untuk filter dan paginasi
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah item per halaman

  // Filter buku berdasarkan kategori dan status
  const filteredBooks = books.filter((book) => {
    const categoryMatch =
      categoryFilter === "" || book.kategori.toLowerCase() === categoryFilter.toLowerCase();
    const statusMatch =
      statusFilter === "" ||
      (statusFilter === "tersedia" && book.status) ||
      (statusFilter === "dipinjam" && !book.status);

    return categoryMatch && statusMatch;
  });

  // Hitung total halaman
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Ambil data buku untuk halaman saat ini
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Filter */}
      <div className="mt-2 mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          {/* Filter Kategori */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md"
          >
            <option value="">Semua Kategori</option>
            {[...new Set(books.map((book) => book.kategori))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md"
          >
            <option value="">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>


          {/* Reset Filter */}
          <button
            onClick={() => {
              setCategoryFilter("");
              setStatusFilter("");
              setCurrentPage(1);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedBooks.map((book) => (
          <div
            key={book.id}
            className="max-w-sm w-full flex flex-col bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-4 flex flex-col justify-between leading-normal">
              <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4">
                {/* Gambar Kartu */}
                <div
                  className="h-48 lg:h-60 lg:w-40 bg-cover rounded-lg border border-gray-300 mt-4 lg:mt-0"
                  style={{
                    backgroundImage: book.image
                      ? `url(http://localhost:8000/storage/image/${book.image})`
                      : `url(/path/to/default/image.jpg)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                {/* Info Buku */}
                <div className="flex flex-col flex-grow mt-4 ml-auto text-right">
                  <p className="text-sm text-dark-600 flex items-center mb-1 justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="16"
                      height="16"
                      className="mr-2 text-blue-500 rotate-180"
                    >
                      <path d="M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                    {book.kategori} |  <strong className="ml-2" > {book.status} </strong>
                  </p>

                  <div className="text-dark-900 font-bold text-xl mb-5">{book.judul}</div>
                  <div className="flex items-center justify-end mb-4">
                    <div className="text-sm text-right">
                      <p className="text-dark-900 leading-none mb-2">{book.penulis}</p>
                      <p className="text-dark-600 mb-2">{book.tahun_terbit}</p>

                      {/* link untuk detail book */}
                      <Link
                        href={`/books/${book.id}`}
                        onClick={() => setSelectedBook(book)}
                        style={{
                          textDecoration: "underline",
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-md ${currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Card;
