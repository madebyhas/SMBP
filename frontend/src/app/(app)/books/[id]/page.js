"use client";

import Header from "@/app/(app)/Header";
import { useBookContext } from "@/components/BookContext";
import { useState } from "react";
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';


const BookDetail = () => {
  const { selectedBook, setSelectedBook } = useBookContext(); // Ambil data buku yang dipilih dari context
  const { user } = useAuth(); // hook useAuth untuk mendapatkan data user
  const [userId] = useState(user?.id || null);// set user ID dari hook auth yang sedang login

  if (!selectedBook) {
    return (
      <>
        <Header title="Detail Books" meta="Detail Books" />
        <div className="container mx-auto py-10 text-center">
          <p className="text-gray-600">Tidak ada buku yang dipilih.</p>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-gray-800 hover:bg-gray-900 outline-none"
            onClick={() => window.history.back()}
          >
            Kembali
          </button>
        </div>
      </>
    );
  }

  //handle pinjam
  const handlePinjam = async () => {
    const formData = new FormData();
    formData.append("status", "dipinjam");
    formData.append("user_id", userId);

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/books/${selectedBook.id}/pinjam`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSelectedBook(data.data);
      console.log("Book borrowed successfully:", data.data);

      // Kembali ke halaman sebelumnya
      window.history.back();
    } catch (error) {
      console.error("Failed to borrow the book:", error.response || error);
    }
  };

  // handle selesai
  const handleSelesai = async () => {
    const formData = new FormData();
    formData.append("status", "tersedia");
    formData.append("user_id", null);

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/books/${selectedBook.id}/selesai`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSelectedBook(data.data);
      console.log("Book returned successfully:", data.data);

      // Kembali ke halaman sebelumnya
      window.history.back();
    } catch (error) {
      console.error("Failed to return the book:", error.response || error);
    }
  };

  return (
    <>
      <Header title="Detail Books" meta="Detail Books" />
      <div className="container mx-auto py-10">
        <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto">
          <div className="flex items-center gap-2 px-6">
            <h3 className="text-xl text-gray-800 font-bold flex-1">{selectedBook.judul}</h3>

          </div>

          <div className="min-h-[300px]">
            {selectedBook.image ? (
              <img
                src={`http://localhost:8000/storage/image/${selectedBook.image}`}
                alt={selectedBook.judul}
                className="w-full my-6"
              />
            ) : (
              <img
                src="https://via.placeholder.com/300x300"
                alt="Placeholder"
                className="w-full my-6"
              />
            )}
          </div>

          <div className="px-6 items-center">
            <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <span class="text-sm font-medium text-slate-600">
                <strong>Tahun Terbit :</strong> {selectedBook.tahun_terbit}
              </span>
            </div>

            <div class="p-4">
              <h5 class="mb-2 text-slate-800 text-xl font-semibold">
                <strong>Judul Buku : {selectedBook.judul} </strong>
              </h5>
              <p class="text-slate-600 leading-normal font-light">
                <strong> {selectedBook.kategori} </strong> | <strong> {selectedBook.status} </strong> |  <strong> {selectedBook.penulis} </strong>      </p>
            </div>
            <div class="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
              <span class="text-sm text-slate-600 font-medium">
              
              {/* Tampilkan tombol sesuai status */}
              {selectedBook.status === "tersedia" ? (
                <button
                  type="button"
                  className="px-5 mr-4 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 outline-none"
                  onClick={handlePinjam}
                >
                  Pinjam
                </button>

              ) : (
                <button
                  type="button"
                  className="px-5 mr-4 py-2.5 rounded-lg text-white text-sm tracking-wider bg-green-600 hover:bg-green-700 outline-none"
                  onClick={handleSelesai}
                >
                  Selesai
                </button>
              )}

              <button
                type="button"
                className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-gray-800 hover:bg-gray-900 outline-none"
                onClick={() => window.history.back()}
              >
                Kembali
              </button>
              
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
