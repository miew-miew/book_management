<?php

namespace App\Http\Controllers;

use App\Models\ReadingProgress;
use App\Http\Requests\StoreReadingProgressRequest;
use App\Http\Requests\UpdateReadingProgressRequest;

class ReadingProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReadingProgressRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ReadingProgress $readingProgress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReadingProgressRequest $request, ReadingProgress $readingProgress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReadingProgress $readingProgress)
    {
        //
    }
}
