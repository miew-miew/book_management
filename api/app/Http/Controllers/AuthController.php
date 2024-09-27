<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken($request->name)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(LoginRequest $request) {
        $data = $request->validated();
        if(!Auth::attempt($data)){  
            return response([
                'message' => 'Provided email address or password is incorrect.'
            ]);
        }
        /**@var User $user */
        $user = Auth::user();
        $token = $user->createToken($user->name)->plainTextToken;

        return[
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response('', 204);
    }
}
