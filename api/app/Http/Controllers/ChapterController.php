<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChapterRequest;
use App\Http\Requests\UpdateChapterRequest;
use App\Models\Book;
use App\Models\Chapter;
use Illuminate\Support\Facades\Gate;

class ChapterController extends Controller
{
    /**
     * Display a listing of the chapters for a specific book.
     */
    public function index(Book $book)
    {
        return $book->chapters;
    }

    /**
     * Store a newly created chapter in storage.
     */
    public function store(StoreChapterRequest $request, Book $book)
    {
        Gate::authorize('modify', $book);

        $data = $request->validated(); 

        $chapter = $book->chapters()->create($data);

        return response()->json($chapter, 201); 
    }

    /**
     * Display the specified chapter.
     */
    public function show(Book $book, Chapter $chapter)
    {
        if ($chapter->book_id !== $book->id) {
            abort(404, 'Chapter not found in the specified book');
        }        
        return $chapter;
    }

    /**
     * Update the specified chapter in storage.
     */
    public function update(UpdateChapterRequest $request, Book $book, Chapter $chapter)
    {
        Gate::authorize('modify', $book);

        $data = $request->validated(); 

        $chapter->update($data);

        return $chapter;
    }

    /**
     * Remove the specified chapter from storage.
     */
    public function destroy(Book $book, Chapter $chapter)
    {
        Gate::authorize('modify', $book);
        
        $chapter->delete();
        return response()->json(['message' => 'The chapter was deleted'], 204);    
    }
}
