<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'author',
        'title',
        'book_cover',
        'description'
    ];

    public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}

    public function chapters(): HasMany 
    {
        return $this->hasMany(Chapter::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
