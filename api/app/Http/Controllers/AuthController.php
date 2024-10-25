<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);
        $token = $user->createToken($request->name)->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request) {
        $data = $request->validated();
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response(['message' => 'The provided credentials are incorrect.'], 401);
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response ('', 204);
    }
}
