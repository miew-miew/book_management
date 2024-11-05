<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Book; 
use Illuminate\Database\Eloquent\Factories\Factory;

class ChapterFactory extends Factory
{
    protected $model = Chapter::class;

    public function definition()
    {
        return [
            'book_id' => Book::factory(),
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
        ];
    }
}
