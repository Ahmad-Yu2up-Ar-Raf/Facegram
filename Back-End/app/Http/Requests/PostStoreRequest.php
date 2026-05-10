<?php

namespace App\Http\Requests;

use App\Enums\VisibilityEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'caption' => ['required', 'string', 'max:255'],
            'media' => ['array', 'nullable'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'visibility' => ['required', 'string', Rule::enum(VisibilityEnum::class)],
            'location' => ['nullable', 'string', 'max:255'],
        ];
    }
}
