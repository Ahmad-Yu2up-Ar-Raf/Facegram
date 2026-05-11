<?php

namespace App\Http\Controllers;


use App\Models\Likes;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        //
        $user = User::findOrFail($id);
        $likes = $user->likedPosts()->paginate(10);


        return response()->json([

            'data' => $likes,
            'succes' => true,
            'message' => 'succes fetched likes'
        ]);
    }



    public function liker(string $id)
    {
        //
        $post = Posts::findOrFail($id);
        $likes = $post->liker()->paginate(10);


        return response()->json([

            'data' => $likes,
            'succes' => true,
            'message' => 'succes fetched likes'
        ]);
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
    public function store(Request $request, string $id)
    {
        //
        Posts::findOrFail($id);
        $user = $request->user();
        $result = $user->likedPosts()->toggle($id);
        return response()->json([

            'succes' => true,

            'message' => 'succes added likes'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Likes $likes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Likes $likes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Likes $likes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {

        $user = $request->user();

        $result = $user->likedPosts()->detach($id);

        return response()->json([
            'success' => $result,
            'message' => 'Success removed like'
        ]);
    }
}
