<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Books;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat user admin
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin', // Role sebagai admin
        ]);

        // Membuat user biasa
        User::factory()->create([
            'name' => 'Regular User',
            'email' => 'user@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'user', // Role sebagai user
        ]);

        // Seeder factory untuk books
        User::factory(10)->create();

        // Seeder untuk books
        Books::factory(10)->create();

    }
}
