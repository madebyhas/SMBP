<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

use Illuminate\Support\Facades\Route;

//Api Register
Route::post('/auth/register', [RegisteredUserController::class, 'store'])
->middleware('guest')
->name('register');

//Api Login
Route::post('/auth/login', [AuthenticatedSessionController::class, 'store'])
->middleware('guest')
->name('login');

//Api Logout
Route::post('/auth/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
    
