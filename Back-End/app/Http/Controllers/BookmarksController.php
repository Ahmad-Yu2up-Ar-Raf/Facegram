<?php

namespace App\Http\Controllers;

use App\Models\Bookmarks;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;

class BookmarksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookmarks =  $request->user()->bookmarks()->paginate(10);

        return response()->json([
            'data' => $bookmarks,
            'succes' => true
        ], 200);
        //
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

        $user = $request->user();

        $result = $user->bookmarks()->toggle($id);

        return response()->json([
            'succes' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        //

        $user = $request->user();

        $post = $user->bookmarks()->where('post_id', $id)->get();

        return response()->json([
            'data' => $post,
            'succes' => true
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookmarks $bookmarks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookmarks $bookmarks)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        //
        $user = $request->user();

        $bookmarks = $user->bookmarks()->detach($id);

        return response()->json([
            'succes' => $bookmarks,
        ], 204);
    }
}
