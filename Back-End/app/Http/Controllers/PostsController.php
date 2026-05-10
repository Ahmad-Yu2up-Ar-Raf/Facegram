<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;

use App\Models\Posts;

use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $posts = Posts::forWebsite()
            ->paginate(10);

        return response()->json([

            'data' => $posts,
            'message' => 'Succes fetched data!',
            'succes' => true
        ], 200);
    }



    public function feeds(Request $request)
    {
        $posts = Posts::forWebsite()
            ->fromFollowing()
            ->paginate(10);

        return response()->json($posts);
    }



    public function user_post(string $id)
    {
        //

        $posts = Posts::forWebsite()
            ->where('user_id', $id)
            ->paginate(10);

        return response()->json([

            'data' => $posts,
            'message' => 'Succes fetched data!',
            'succes' => true
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //'
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {

        $validate = $request->validated();
        $user = $request->user();
        $post = Posts::create([
            ...$validate,
            'user_id' => $user->id
        ]);


        return response()->json([
            'data' => $post,
            'message' => 'succes post data',
            'succes' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $post = Posts::published()->findOrFail($id);



        return response()->json([
            'data' => $post,
            'message' => 'fetched post data succes',
            'succes' => true
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostStoreRequest $request, String $id)
    {
        $post = Posts::findOrFail($id);

        $valited = $request->validated();

        $update = $post->update($valited);

        return response()->json([
            // 'data' => $update,
            'message' => 'Succes updated data post',
            'succes' => $update,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Posts::findOrFail($id);


        $delete = $post->delete();



        return response()->json([

            'message' => 'succes deleted post data',
            'succes' =>  $delete
        ]);
    }
}
