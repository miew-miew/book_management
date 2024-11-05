<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Chapter;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Ny Aina',
            'email' => 'nyaina@gmail.com',
            'password' => 'cutie.pie'
        ]);

        // Créer 10 livres avec 3 chapitres chacun
        Book::factory()
        ->count(10)
        ->has(Chapter::factory()->count(3))
        ->create();
    }
}
