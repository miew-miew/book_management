<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use Illuminate\Support\Facades\Gate;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BookResource::collection(
            Book::query()->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $data = $request->validated();
        
        // Gérer l'upload du fichier de la couverture du livre
        if ($request->hasFile('book_cover')) {
            $path = $request->file('book_cover')->store('book_covers', 'public');
            $data['book_cover'] = $path;
        }
    
        // Créer le livre
        $book = $request->user()->books()->create($data);
    
        // Filtrer les chapitres et les associer au livre
        if (!empty($data['chapters'])) {
            foreach ($data['chapters'] as $chapterData) {
                if (!empty($chapterData['title']) || !empty($chapterData['content'])) {
                    $book->chapters()->create($chapterData);
                }
            }
        }
    
        return response(new BookResource($book), 201);
    }    

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return new BookResource($book); // Return BookResource for the specific book
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        Gate::authorize("modify", $book);
        $data = $request->validated();
        $book->update($data);
        return new BookResource($book); // Return BookResource after updating the book
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        Gate::authorize("modify", $book);
        $book->delete();
        return response()->json(['message' => 'The book was deleted'], 204);
    }
}
