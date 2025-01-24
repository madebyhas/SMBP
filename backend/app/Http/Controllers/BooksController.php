<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BooksResource;
class BooksController extends Controller
{
    // Menampilkan daftar buku
    public function index(Request $request)
    {
        $book = Books::all(); // like a select * form books
        $booksResource = BooksResource::collection($book); //format data berbentuk resource

        //respon dari format data berbentuk resource
        return $this->sendResponse($booksResource, "Data Books Berhasil!");
    }

    // Menambah buku baru
    public function store(Request $request)
    {
        $request->all(); //ambil data dari request inputan

        //Validasi request data
        $request->validate([
            'judul' => 'required|string|max:255', //validasi wajib diisi, string, max 255 char
            'penulis' => 'required|string|max:255', //validasi wajib diisi, string, max 255 char
            'tahun_terbit' => 'required|integer|digits:4', //validasi wajib diisi, tipe integer/angka, harus 4 digit
            'kategori' => 'required|string|max:100', //validasi wajib diisi, string, max 100 char
            'status' => 'required|in:tersedia,dipinjam', //validasi wajib diisi, pilihan tipe data enum tersedia/dipinjam
            'image' => 'required|mimes:png,jpg,jpeg,webp|max:2048', //validasi wajib diisi, tipe file, dan max 2mb
        ]);

        $book = new Books(); //buat data book
        $book->judul = $request->judul; //buat data judul dari request
        $book->penulis = $request->penulis; //buat data penulis dari request
        $book->tahun_terbit = $request->tahun_terbit; //buat data tahun terbit dari request
        $book->kategori = $request->kategori; //buat data kategori dari request
        $book->status = $request->status; //buat data sttus dari request

        $file = $request->file('image'); //buat data file image dari request

        //Validasi jika data file image ada, maka atur nama dan penyimpanan
        if ($file != null) {
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension(); //atur nama file image
            $book->image = $filename;  //buat data file image yang telah diatur 
            $file->storeAs('image/', $filename, 'public'); //atur letak file 

        }

        $book->save(); //simpan book

        //berikan respon
        return $this->sendResponse(new BooksResource($book), "Data Books Berhasil Di Upload!");
    }

    // Mengupdate data buku
    public function update(Request $request, $id)
    {
        $input = $request->all(); //ambil data dari request inputan

        //aValidasi request
        $request->validate([
            'judul' => 'required|string|max:255', //validasi wajib diisi, string, max 255 char
            'penulis' => 'required|string|max:255', //validasi wajib diisi, string, max 255 char
            'tahun_terbit' => 'required|integer|digits:4', //validasi wajib diisi, tipe integer/angka, harus 4 digit
            'kategori' => 'required|string|max:100', //validasi wajib diisi, string, max 100 char
            'status' => 'required|in:tersedia,dipinjam', //validasi wajib diisi, pilihan tipe data enum tersedia/dipinjam
            'image' => 'required|mimes:png,jpg,jpeg,webp|max:2048', //validasi wajib diisi, tipe file, dan max 2mb
        ]);

        // Cari data buku berdasarkan ID
        $book = Books::find($id);
        if (!$book) {
            return $this->sendError("Data Book Tidak Ditemukan!", [], 404); //respon gagal
        }

        // Perbarui data buku
        $book->judul = $input["judul"]; //buat data judul dari request input
        $book->penulis = $input["penulis"]; //buat data penulis dari request input
        $book->tahun_terbit = $input["tahun_terbit"]; //buat tehun judul dari request input
        $book->kategori = $input["kategori"]; //buat data kategori dari request input
        $book->status = $input["status"]; //buat data status dari request input

        // Jika ada file gambar baru, hapus gambar lama dan simpan yang baru
        $file = $request->file('image');
        if ($file != null) {
            // Hapus gambar lama jika ada
            if ($book->image && \Storage::disk('public')->exists('image/' . $book->image)) {
                \Storage::disk('public')->delete('image/' . $book->image);
            }

            // Simpan gambar baru
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension(); // atur nama file
            $book->image = $filename;  //buat data file image yang telah diatur
            $file->storeAs('image/', $filename, 'public'); //atur letak file 
        }

        $book->save(); //simpan data book

        //berikan respon
        return $this->sendResponse(new BooksResource($book), "Data Book Berhasil Diubah!");
    }


    // Menghapus buku
    public function destroy($id)
    {
        //cari id book
        $book = Books::find($id);
        $book->delete(); //delete buku

        // berikan repspon
        return $this->sendResponse([], "Data Book Berhasil Di Hapus!");

    }

    // Menampilkan detail buku
    public function show($id)
    {
        // cari data book
        $book = Books::find($id);

        // berikan respon
        return $this->sendResponse(new BooksResource($book), "Data Book Berhasil Di Tampilkan!");
    }

    // Fungsi untuk meminjam buku
    public function pinjam(Request $request, $id)
    {
        // cari data book dari db
        $book = Books::find($id);

        // Validasi input
        $validatedData = $request->validate([
            'status' => 'required|in:dipinjam,tersedia', // Validasi enum status
            'user_id' => 'nullable|exists:users,id',    // Validasi user_id
        ]);

        // Update status dan user_id
        $book->status = $validatedData['status'];
        $book->user_id = $validatedData['user_id'];
        $book->save(); //simpan
        //berikan respon
        return $this->sendResponse(new BooksResource($book), "Data Book Berhasil Di Dipinjam!");
    }


    // Fungsi untuk menyelesaikan peminjaman
    public function selesai($id)
    {
        // cari data book
        $book = Books::find($id);

        //validasi data book yang dicari dan respon
        if (!$book) {
            return $this->sendError("Data Books Gagal Diubah!");
        }

        // Perbarui status buku menjadi "Tersedia" dan hapus user_id
        $book->status = true; // Tersedia
        $book->user_id = null; //set null user
        $book->save();

        // respon 
        return $this->sendResponse(new BooksResource($book), "Data Book Berhasil Di Dikembalikan!");

    }
}
