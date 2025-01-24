<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BooksController; //controller Books
use App\Http\Controllers\UsersController; //controller User

//Api Auth
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//API User
Route::resource('users', UsersController::class);

// API books
Route::resource('books', BooksController::class);

// API books pinjam
Route::post('/books/{id}/pinjam', [BooksController::class, 'pinjam']);

// API books selesai pinjam
Route::post('/books/{id}/selesai', [BooksController::class, 'selesai']);


