import LoginBlock from "@/components/ui/core/blocks/login-block"
import PostCard from "@/components/ui/fragments/custom/card/post-card"
import type { Post } from "@/types/posts-type"
import { Skeleton } from "boneyard-js/react" // Pastikan /react
const dummyPost: Post = {
  id: 4,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 3,
  caption: "Quia dolores dignissimos quod voluptatem amet.",
  media: null,
  visibility: "public",
  liker_count: 13,
  reposter_count: 6,
  is_liked: false,
  is_reposted: false,
  is_bookmarked: false,
  user: {
    id: 3,
    name: "Miller Jacobi",
    email: "sauer.claudia@example.net",
    email_verified_at: null,
    avatar: "",
    created_at: new Date(),
    updated_at: new Date(),
    is_followed: false,
  },
}

const LoginPage = () => {
  return (
    <>
      <LoginBlock />
      <Skeleton name="post-card" loading={false}>
        <PostCard Post={dummyPost as Post} />
      </Skeleton>
    </>
  )
}

export default LoginPage
