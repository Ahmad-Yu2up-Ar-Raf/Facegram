<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }




    public function following(): BelongsToMany
    {

        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id')->withTimestamps();
    }


    public function followers(): BelongsToMany
    {

        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id');
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Posts::class, 'user_id');
    }
    public function repostedPosts(): BelongsToMany
    {
        return $this->BelongsToMany(Posts::class, 'reposts', 'user_id', 'post_id')->withTimestamps();
    }
    public function likedPosts(): BelongsToMany
    {
        return $this->belongsToMany(Posts::class, 'likes', 'user_id', 'post_id')->withTimestamps();
    }
    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(Posts::class, 'bookmarks', 'user_id', 'post_id')->withTimestamps();
    }
}
