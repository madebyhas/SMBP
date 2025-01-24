<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id(); //primary key id books
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('judul', 255);
            $table->string('penulis', 255);
            $table->year('tahun_terbit');
            $table->string('image');
            $table->string('kategori', 100);
            $table->enum('status', ['tersedia', 'dipinjam']);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users'); //foreign key dari id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
