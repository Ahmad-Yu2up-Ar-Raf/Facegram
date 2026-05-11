<?php

namespace App\Models;

use App\Enums\VisibilityEnum;
use Database\Factories\PostsFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class Posts extends Model
{
    /** @use HasFactory<PostsFactory> */
    use HasFactory;
    protected $table = "posts";

    protected $fillable = [
        'user_id',
        'caption',
        'media',
        'visibility',

    ];

    protected $casts = [
        'media' => 'array',
        'caption' => 'string',
        'visibility' => VisibilityEnum::class
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function liker(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }
    public function reposter(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'reposts',  'post_id', 'user_id');
    }


    public function scopePublished(Builder $query): Builder
    {


        return $query->whereVisibility(VisibilityEnum::Public->value)->with('user')
            ->withCount(['liker', 'reposter']) // Menghitung jumlah total
            ->withExists(['isLiked as is_liked', 'isReposted as is_reposted']);
    }

    public function scopeForWebsite(Builder $query): Builder
    {


        return $query->Published()->latest();
    }


    public function isLiked()
    {
        $userId = Auth::id();
        return $this->liker()->where('user_id', $userId);
    }


    public function isReposted()
    {
        $userId = Auth::id();
        return $this->reposter()->where('user_id', $userId);
    }


    public function scopeFromFollowing(Builder $query): Builder
    {
        $user = Auth::user();
        return $query->whereIn('user_id', $user->following()->select('following_id'));
    }

    public function bookmarks() : BelongsToMany {
    return $this->belongsToMany(User::class, 'bookmarks', 'post_id', 'user_id');
    }
}
