<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmarks extends Model
{
    //
    protected $table = "bookmarks";
    protected $fillable = [
    'user_id',
    'post_id',
    ];


}
