<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\Reposts;
use App\Models\User;

use Illuminate\Http\Request;


class RepostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $user = User::findOrFail($id);
        $reposts = $user->repostedPosts()->paginate(10);

        return response()->json([

            'data' => $reposts,
            'succes' => true,
            'message' => 'Succes fetched reposts data'
        ]);
    }

    public function reposter(string $id)
    {
        $post = Posts::findOrFail($id);
        $reposts = $post->reposter()->paginate(10);

        return response()->json([

            'data' => $reposts,
            'succes' => true,
            'message' => 'Succes fetched reposts data'
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
    public function store(string $id, Request $request)
    {
        $user = $request->user();
        $result =  $user->repostedPosts()->toggle($id);


        return response()->json([
            // 'data' => $request,
            'attach' => count($result['attached']) > 0 ? 'Repost' : 'Un-Repost',
            'message' => "Repost added",
            'succes' => true,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reposts $reposts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reposts $reposts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reposts $reposts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {

        $user = $request->user();

        $result = $user->repostedPosts()->detach($id);
        return response()->json([
            'succes' => $result,
            'message' => "Succes remove reposts"
        ]);
    }
}
