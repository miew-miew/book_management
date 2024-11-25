<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a specific book.
     */
    public function index($bookId)
    {
        $comments = Comment::where('book_id', $bookId)->with('user')->latest()->get();
        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request, $bookId)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'book_id' => $bookId,
            'content' => $request->input('content'),
        ]);

        return new CommentResource($comment->load('user'));
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment->update([
            'content' => $request->input('content'),
        ]);

        return new CommentResource($comment->load('user'));
    }

    /**
     * Remove the specified comment.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
