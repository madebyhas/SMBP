<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Validator;

class UsersController extends Controller
{
    // Menampilkan daftar User
    public function index(Request $request)
    {
        $user = User::all(); // like a select * form User
        $userResource = UsersResource::collection($user); //format data berbentuk resource

        //respon
        return $this->sendResponse($userResource, "Data User Berhasil Di Tampilkan!");
    }

    // Menambah user baru
    public function store(Request $request)
    {
        //validasi request
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            //Role sudah default di DB
        ]);

        //buat user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            //Role sudah default di DB
        ]);

        //respon
        return $this->sendResponse(new UsersResource($user), "Data User Berhasil Di Upload!");
    }

    // Mengupdate data user
    public function update(Request $request, $id)
    {   

        $input = $request->all(); //ambil data dari request inputan

        // Validasi data tanpa mewajibkan password diisi
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,' . $id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()], // Password tidak wajib
        ]);

        // cari User berdasarkan ID
        $user = User::findOrFail($id);

        // Update data user
        $user->name = $input['name'];
        $user->email = $input['email'];

        // Periksa apakah password diisi, jika ya, hash dan simpan
        if (!empty($input['password'])) {
            $user->password = Hash::make($input['password']);
        }

        $user->save();

        // Berikan respons sukses
        return $this->sendResponse(new UsersResource($user), "Data User Berhasil Diubah!");
    }


    // Menghapus user
    public function destroy($id)
    {
        //cari User berdasarkan ID dan delete
        $user = User::find($id);
        $user->delete();

        //respon
        return $this->sendResponse([], "Data Book Berhasil Di Hapus!");

    }

    // Menampilkan detail user
    public function show($id)
    {
        //cari User berdasarkan ID
        $user = User::find($id);
        
        //respon
        return $this->sendResponse(new UsersResource($user), "Data Book Berhasil Di Tampilkan!");
    }


}
