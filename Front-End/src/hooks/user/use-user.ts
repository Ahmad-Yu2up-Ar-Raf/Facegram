import { api } from "@/api/client"
import { useQueryClient } from "@tanstack/react-query"
import type { PostsResponse } from "@/types/posts-type"

export const useUser = (userId: number) => {
  const queryClient = useQueryClient()

  const handleFollow = async () => {
    // 1. Batalkan query yang sedang berjalan agar tidak bentrok
    await queryClient.cancelQueries({ queryKey: ["posts"] })

    // 2. Ambil data lama buat jaga-jaga kalau mau rollback (Optional)
    const previousPosts = queryClient.getQueryData(["posts"])

    // 3. Optimistic Update (Ganti di cache duluan)
    queryClient.setQueriesData(
      { queryKey: ["posts"] },
      (old: PostsResponse | undefined) => {
        if (!old) return old

        return {
          ...old,
          data: {
            ...old.data,
            // Kita map array 'data' yang ada di dalem objek 'Data'
            data: old.data.data.map((post) => {
              if (post.user.id === userId) {
                return {
                  ...post,
                  user: {
                    ...post.user,
                    is_followed: !post.user.is_followed,
                  },
                }
              }
              return post
            }),
          },
        }
      }
    )

    try {
      // 4. Kirim ke API
      await api.post(`users/${userId}/follow`)

      // 5. Invalidate biar data bener-bener sinkron sama server di background
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    } catch (error) {
      // 6. Kalau gagal, balikin ke data sebelumnya
      if (previousPosts) {
        queryClient.setQueryData(["posts"], previousPosts)
      }
      console.error("Follow failed:", error)
    }
  }

  return { handleFollow }
}
