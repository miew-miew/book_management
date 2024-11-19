<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\ReadingProgressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// // Public routes for fetching books and chapters
// Route::get('/books', [BookController::class, 'index']);
// Route::get('/books/{book}', [BookController::class, 'show']);
// Route::get('/books/{book}/chapters', [ChapterController::class, 'index']);
// Route::get('/books/{book}/chapters/{chapter}', [ChapterController::class, 'show']);

// Authenticated routes for managing books and chapters
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/books', BookController::class);
    Route::apiResource('books.chapters', ChapterController::class);
    
    Route::post('/books/{book}/chapters/{chapter}/read', [ChapterController::class, 'markAsRead']);
    Route::get('/books/{book}/read-chapters', [ChapterController::class, 'getReadChapters']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
