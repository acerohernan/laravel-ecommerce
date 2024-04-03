<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required',
            'remember' => 'boolean',
        ]);

        // extract remmember variable and delete from credentials
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        // try to login
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin) {
            Auth::logout();
            return response([
                'message' => 'You don\'t have permission to authenticate as admin'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'token' =>  $token,
            'user' => new UserResource($user),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response('', Response::HTTP_NO_CONTENT);
    }

    public function getUser(Request $request)
    {
        return response([
            'user' => new UserResource($request->user()),
        ]);
    }
}
