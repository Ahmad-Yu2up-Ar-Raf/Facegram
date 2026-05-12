import { api } from "@/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUser = () => {
  const queryClient = useQueryClient()
  const handleFollow = async (userId: number, userName: string) => {
    const followAction = async () => {
      const result = await api.post(`users/${userId}/follow`).json<{
        succes: boolean
        attached: string
      }>()
      queryClient.invalidateQueries({ queryKey: ["posts"] })

      return result
    }
    toast.promise(followAction(), {
      success: (data) =>
        `${data.attached ? "Followed" : "Un-Follow"} ${userName}`,
      loading: "Loading...",
      error: (err) => {
        return err.message || "Failed following user"
      },
    })
  }

  return {
    handleFollow,
  }
}
