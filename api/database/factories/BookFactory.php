<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Crée un utilisateur associé
            'author' => $this->faker->name,
            'title' => $this->faker->sentence,
            'book_cover' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph,
        ];
    }
}
