<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Followers extends Model
{
    //
    protected $table = "followers";

    protected $fillable = [
        'follower_id',
        'following_id',
    ];


    // public function following(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'following_id');
    // }
    // public function follower(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'follower_id');
    // }

    public function scopeForUser(Builder $q): Builder
    {

        $user = Auth::id();
        return $q->whereUserId($user);
    }
}
