<?php

namespace Database\Factories;

use App\Models\Likes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Likes>
 */
class LikesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
     $random = rand(1,8);
        return [
            'user_id' => 1,
            'post_id' => $random
        ];
    }
}
