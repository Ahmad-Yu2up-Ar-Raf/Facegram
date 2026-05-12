import type { User } from "./auth-types"

export interface PostsResponse {
  data: Data
  message: string
  succes: boolean
}

export interface Data {
  current_page: number
  data: Post[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: null
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface Post {
  id: number
  created_at: Date
  updated_at: Date
  user_id: number
  caption: string
  media: null
  visibility: string
  liker_count: number
  reposter_count: number
  is_bookmarked: boolean
  is_liked: boolean
  is_reposted: boolean
  user: User
}

export interface Link {
  url: null | string
  label: string
  page: number | null
  active: boolean
}
