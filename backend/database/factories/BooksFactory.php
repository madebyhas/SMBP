<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Books>
 */
class BooksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Books::class; // Pastikan nama model benar

    public function definition(): array
    {
        // Tetapkan status selalu "tersedia"
        $status = 'tersedia';

        // Jika status adalah "dipinjam", ambil user_id secara random dari tabel users
        $userId = null;

        return [
            'judul' => $this->faker->sentence(),
            'penulis' => $this->faker->name(),
            'tahun_terbit' => $this->faker->year(),
            'image' => $this->faker->imageUrl(200, 300, 'books', true, 'Cover'), // URL gambar random
            'kategori' => $this->faker->word(),
            'status' => $status,
            'user_id' => $userId, // Bisa null jika status tersedia
        ];
    }
}
