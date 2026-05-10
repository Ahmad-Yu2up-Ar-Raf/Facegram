<?php

namespace App\Http\Controllers;

use App\Models\Followers;
use App\Models\User;
use Error;
use Illuminate\Http\Request;

class FollowersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        //

        $user = User::findOrFail($id);

        $followers = $user->followers()->paginate(10);
        return response()->json([
            'succes' => true,

            'data' => $followers
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $id, Request $request)
    {
        $user = User::findOrFail($id);
        $result = $request->user()->following()->toggle($user->id);

        return response()->json([
            'success' => true,
            'attached' => count($result['attached']) > 0
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Followers $followers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Followers $followers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Followers $followers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {

        $request
            ->user()
            ->following()
            ->detach($id);


        return response()->json([
            'succes' => true,
            'message' => "Succes unfollowed user!"
        ]);
    }
}
