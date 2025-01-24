<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory;
    protected $table = 'books'; //protect books table
    protected $primaryKey = 'id'; //set primary key

    protected $fillable = ['judul', 'penulis', 'user_id', 'tahun_terbit', 'kategori', 'image', 'status',]; //kolom yang dapat diisi

    //mengatur relasi foreign key user_id kpd primary key id user
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
}
