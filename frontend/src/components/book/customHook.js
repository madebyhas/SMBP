import { useEffect, useState } from 'react';
import axios from '@/lib/axios';


const useBook = formik => {
    //State books, loading, dan eror
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null); // Data buku yang dipilih
    const [loading, setLoading] = useState([false])
    const [error, setErorr] = useState(null)

    //useeffect untuk looping data
    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const { data } = await axios.get("http://localhost:8000/api/books");
                setBooks(data.data)
            } catch (error) {
                setErorr(error.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    //ambil data books untuk dikirmkan ke form input
    const getBook = async id => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/books/${id}`)

            const book = data.data

            formik.setFieldValue('judul', book.judul)
            formik.setFieldValue('penulis', book.penulis)
            formik.setFieldValue('tahun_terbit', book.tahun_terbit)
            formik.setFieldValue('kategori', book.kategori)
            formik.setFieldValue('status', book.status)
            formik.setFieldValue('image', book.image)
            formik.setFieldValue('id', book.id)

        } catch (error) {
            console.log(error);
        }
    }

    // Fungsi untuk memilih buku berdasarkan ID
    const handleSelectBook = (id) => {
        const book = books.find((item) => item.id === id); // Cari buku berdasarkan ID
        setSelectedBook(book); // Simpan buku yang dipilih ke state
    };

    //handle untuk add book
    const handleAddBook = async (values) => {
        // Buat FormData untuk mengirim file dan data lainnya
        const formData = new FormData();
        formData.append("judul", values.judul);
        formData.append("penulis", values.penulis);
        formData.append("tahun_terbit", values.tahun_terbit);
        formData.append("kategori", values.kategori);
        formData.append("status", values.status);
        formData.append("image", values.image); // File dari input

        try {
            const { data } = await axios.post("http://localhost:8000/api/books", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const book = data.data;
            setBooks((prev) => [...prev, book]);
        } catch (error) {
            console.error("Error uploading book:", error.response?.data || error.message);
        }
    };

    // handle untuk update book
    const handleUpdateBooks = async values => {
        const formData = new FormData();
        formData.append('judul', values.judul);
        formData.append('penulis', values.penulis);
        formData.append('tahun_terbit', values.tahun_terbit);
        formData.append('kategori', values.kategori);
        formData.append('status', values.status);
        if (values.image instanceof File) {
            formData.append('image', values.image); // Tambahkan file gambar jika ada
        }

        const { data } = await axios.post(
            `http://localhost:8000/api/books/${values.id}?_method=PUT`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        const book = data.data;

        // Perbarui state Rpada eact
        const updatedBooks = books.map(item =>
            item.id === book.id ? book : item,
        );
        setBooks(updatedBooks);
    };

    // handle untuk delete book
    const handleDeleteBooks = async id => {
        const isYes = confirm('Anda Yakin Menghapus data ini?')
        if (isYes) {
            try {
                await axios.delete(`http://localhost:8000/api/books/${id}`)
                const filteredBooks = books.filter(item => item.id !== id)
                setBooks(filteredBooks)

            } catch {
                console.log(error)
            }
        }
    }

    const handleDetailBook = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/books/${id}`);
            return data.data;
        } catch (error) {
            console.error("Error fetching book details:", error.message);
        }
    }

    return {
        books,
        bookloading: loading,
        bookError: error,
        getBook,
        handleAddBook,
        handleUpdateBooks,
        handleDeleteBooks,
        handleSelectBook,
        handleDetailBook,
    }
}


export default useBook