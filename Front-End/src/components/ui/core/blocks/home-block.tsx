import { FetchPost } from "@/hooks/posts/use-post"

import type { Post } from "@/types/posts-type"
import { AppHeader } from "@/components/app-header"
import PostCard from "../../fragments/custom/card/post-card"

const HomeBlock = () => {
  const { isLoading, data } = FetchPost()
  const posts: Post[] = data?.data.data ?? []

  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {/* <Spinner className="m-auto mb-5 size-10" /> */}
            <p className="text-xl text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-0">
            {posts.map((post, i) => (
              <PostCard Post={post} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default HomeBlock
