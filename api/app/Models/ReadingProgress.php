<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'user_id',
        'progress', 
    ];

    protected $casts = [
        'progress' => 'array', // Cast completed chapters as an array
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Calculate the reading progress as a percentage.
     */
    public function calculateProgress(): float
    {
        $totalChapters = $this->book->chapters->count();
        $completedChapters = count($this->completed_chapters ?? []);

        return $totalChapters > 0 ? ($completedChapters / $totalChapters) * 100 : 0;
    }

    /**
     * Get the next chapter to read.
     */
    public function nextChapterToRead()
    {
        $completedChapters = $this->completed_chapters ?? [];
        $unreadChapters = $this->book->chapters->whereNotIn('id', $completedChapters);

        return $unreadChapters->first(); // returns the next unread chapter, or null if all are completed
    }
}
