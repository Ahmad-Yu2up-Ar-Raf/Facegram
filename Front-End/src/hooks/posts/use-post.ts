import { api } from "@/api/client"
import type { Post, PostsResponse } from "@/types/posts-type"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { useState } from "react"

 export  const FetchPost = () => {
    return useQuery({
      queryKey: ["posts"],
      queryFn: async () => api.get("posts").json<PostsResponse>(),
    })
  }

export const usePost = (Post: Post) => {
  const [isLiked, setLiked] = useState<boolean>(Post.is_liked)
  const [isReposted, setRepost] = useState<boolean>(Post.is_reposted)

  const [likeCount, setLikeCount] = useState<number>(Post.liker_count)
  const [repostCount, setRepostCount] = useState<number>(Post.reposter_count)



  const handdleToggleLike = async () => {
    
    setLiked(!isLiked)

    if (!isLiked) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    await api.post(`posts/${Post.id}/likes`).json<{
      succes: boolean
      message: string
    }>()
  }

  const handdleToggleRepost = async () => {
    setRepost(!isReposted)
    if (!isReposted) {
      setRepostCount(repostCount + 1)
    } else {
      setRepostCount(repostCount - 1)
    }
    await api.post(`posts/${Post.id}/reposts`).json<{
      succes: boolean
      message: string
    }>()
  }
  return {
    // FetchPost,
    handdleToggleLike,
    handdleToggleRepost,
    isLiked,
    isReposted,
    likeCount,
    repostCount,
  }
}
