<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        // $request->session()->regenerate();
        $user = $request->user();

        $token = $user->createToken('auth-token')->plainTextToken;
        return response()->json([
            // 'message' => 'login succes',
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Auth::guard('web')->logout();

        $request->user()->currentAccessToken()->delete();

        // $request->session()->regenerateToken();

        return response()->json([
            "message" => "Logout Berhasil!"
        ]);
    }
}
