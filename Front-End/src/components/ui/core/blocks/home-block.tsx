import { usePost } from "@/hooks/posts/use-post"
import React from "react"
import { Spinner } from "../../fragments/shadcn/spinner"
import type { Post } from "@/types/posts-type"
import { AppHeader } from "@/components/app-header"
import PostCard from "../../fragments/custom/card/post-card"

const HomeBlock = () => {
  const { isLoading, data } = usePost()
  const posts: Post[] = data?.data.data ?? []
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col gap-0 overflow-y-auto">
        {posts.map((post, i) => (
          <PostCard Post={post} key={i} />
        ))}
      </div>
    </>
  )
}

export default HomeBlock
