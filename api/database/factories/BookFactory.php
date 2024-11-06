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
            'title' => $this->faker->re(3, true), // Génère un titre réaliste
            'book_cover' => $this->faker->imageUrl(200, 300, 'books', true, 'Cover'), // Image liée aux livres
            'description' => $this->faker->realText(200), // Plus long et plus naturel
        ];
    }    
}
