"use client";

import Header from '@/app/(app)/Header'
import axios from '@/lib/axios';
import { useFormik } from 'formik';

import BookForm from '@/components/book/BooksForm';
import BookCard from '@/components/book/card';
import BookList from '@/components/book/list';
import useBook from '@/components/book/customHook';
import { bookSchema } from '@/components/book/schema';
import { useAuth } from '@/hooks/auth'; // Hook untuk mendapatkan informasi user


const Books = () => {
  const { user } = useAuth(); //hook useAuth untuk mendapatkan data user

   //formik untuk set data handle ketika update/add dan reset form ketika di submit
  const formik = useFormik({
    initialValues: {
      judul: '',
      penulis: '',
      tahun_terbit: '',
      kategori: '',
      status: '',
      image: '',
    },
    validationSchema: bookSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.id) {
          handleUpdateBooks(values)
        } else {
          handleAddBook(values)
        }
        resetForm()
      } catch (error) {
        console.log(error)
      }
    },
  })

  //ambil handle dari custom hook
  const {
    books,
    bookloading,
    bookError,
    getBook,
    handleAddBook,
    handleUpdateBooks,
    handleDeleteBooks,
    handleSelectBook,
    handleDetailBook,
  } = useBook(formik);

  if (bookError) return bookError;

  return (
    <>
      <Header title="Books" meta="Books" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-white-200">
              {/* Cek apakah user adalah admin */}
              {user?.role === 'admin' && (
                <>
                  <BookForm handleAddBook={handleAddBook} formik={formik} />

                  {/* Daftar Buku untuk admin */}
                  <BookList books={books} getBook={getBook} handleDeleteBooks={handleDeleteBooks} />
                </>
              )}

            </div>
            <div className="p-6 bg-white border-b border-white-200 mt-5">
              <div className="text-center">
                <span class="text-sm font-medium text-slate-600">
                  <h1 className="text-3xl font-semibold text-gray-900 mb-5">Koleksi Buku Perpustakaan</h1>
                </span>
              </div>
              {/* Daftar Buku untuk user*/}
              <BookCard books={books} getBook={getBook} handleSelectBook={handleSelectBook} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
