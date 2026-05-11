import { api } from "@/api/client"
import type { PostsResponse } from "@/types/posts-type"
import { useQuery } from "@tanstack/react-query"

export const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => api.get("posts").json<PostsResponse>(),
  })
}



