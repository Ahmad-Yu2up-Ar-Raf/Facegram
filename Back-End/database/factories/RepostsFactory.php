<?php

namespace Database\Factories;

use App\Models\Reposts;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reposts>
 */
class RepostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $random = rand(1, 8);
        return [
            'user_id' => 1,
            'post_id' => $random
        ];
    }
}
