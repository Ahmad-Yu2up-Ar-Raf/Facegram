<?php

namespace Database\Factories;

use App\Enums\VisibilityEnum;
use App\Models\Posts;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'caption' =>  fake()->sentence(),
            'user_id' =>  3,
            'visibility' => fake()->randomElement(VisibilityEnum::class),

        ];
    }
}
