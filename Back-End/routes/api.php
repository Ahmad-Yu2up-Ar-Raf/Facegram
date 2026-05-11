<?php

use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\RepostsController;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BookmarksController;
use App\Http\Controllers\FollowersController;

Route::prefix('v1')->group(function () {


    Route::prefix('auth')->group(function () {

        Route::post('/register', [RegisteredUserController::class, 'store'])
            ->middleware('guest')
            ->name('register');

        Route::post('/login', [AuthenticatedSessionController::class, 'store'])
            ->middleware('guest')
            ->name('login');

        // Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        //     ->middleware('guest')
        //     ->name('password.email');

        // Route::post('/reset-password', [NewPasswordController::class, 'store'])
        //     ->middleware('guest')
        //     ->name('password.store');

        // Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        //     ->middleware(['auth', 'signed', 'throttle:6,1'])
        //     ->name('verification.verify');

        // Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        //     ->middleware(['auth', 'throttle:6,1'])
        //     ->name('verification.send');

        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
            ->middleware('auth:sanctum')
            ->name('logout');
    });




    Route::prefix('users')->group(function () {
        Route::get('/{id}/posts', [PostsController::class, 'user_post'])->name('posts.user');
        Route::get('/{id}/posts/reposted', [RepostsController::class, 'index'])->name('reposts.index');
        Route::get('/{id}/posts/liked', [LikesController::class, 'index'])->name('likes.index');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/{id}/followers', [FollowersController::class, 'index'])->name('follow.index');
            Route::post('/{id}/follow', [FollowersController::class, 'store'])->name('follow.store');
            Route::delete('/{id}/unfollow', [FollowersController::class, 'destroy'])->name('follow.destroy');
        });
    });
    Route::get('/bookmarks', [BookmarksController::class, 'index'])->middleware(['auth:sanctum'])->name('post.bookmarks');

    Route::prefix('posts')->middleware('auth:sanctum')->group(function () {

        // CRUD Post
        Route::get('/feeds', [PostsController::class, 'feeds'])->name('posts.feeds');
        Route::post('/', [PostsController::class, 'store'])->name('posts.store');
        Route::put('/{id}', [PostsController::class, 'update'])->name('posts.update');
        Route::get('/', [PostsController::class, 'index'])->name('posts.index');
        Route::delete('/{id}', [PostsController::class, 'destroy'])->name('posts.destoy');


        // Repost API
        Route::post('/{id}/reposts', [RepostsController::class, 'store'])->name('post.reposts.store');
        Route::delete('/{id}/reposts', [RepostsController::class, 'destroy'])->name('post.reposts.destroy');
        Route::get('/{id}/reposts', [RepostsController::class, 'reposter'])->name('post.reposts');


        // Bookmarks API

        Route::post('/{id}/bookmarks', [BookmarksController::class, 'store'])->name('post.bookmarks.store');
        Route::delete('/{id}/bookmarks', [BookmarksController::class, 'destroy'])->name('post.bookmarks.destroy');
        Route::get('/{id}/bookmarks', [BookmarksController::class, 'show'])->name('post.bookmarks.show');

        // Likes API
        Route::get('/{id}/likes', [LikesController::class, 'liker'])->name('post.likes');
        Route::post('/{id}/likes', [LikesController::class, 'store'])->name('post.likes.store');
        Route::delete('/{id}/likes', [LikesController::class, 'destroy'])->name('post.likes.destroy');




        // detail Post
        Route::get('/{id}', [PostsController::class, 'show'])->name('posts.show');
    });
});
