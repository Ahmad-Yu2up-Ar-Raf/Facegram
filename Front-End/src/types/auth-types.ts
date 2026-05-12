export interface AuthResponse {
  token: string
  user: User
}

export interface User {
  id: number
  name: string
  avatar: string
  email: string
  is_followed?: boolean
  email_verified_at: null
  created_at: Date
  updated_at: Date
}
