<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'author' => [
                'required',
                'string'
            ],
            'title' => [
                'required',
                'string'
            ],
            'book_cover' => [
                'required',
                'image'
            ],
            'description' => [
                'required',
                'string'
            ],
            'chapters' => [
                'nullable',  
                'array',  
            ],
            'chapters.*.title' => [
                'nullable', 
                'string',
            ],
            'chapters.*.content' => [
                'nullable',  
                'string',
            ]
        ];
    }
}
