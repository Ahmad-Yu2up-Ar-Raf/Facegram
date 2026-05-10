import type { AuthResponse, User } from "@/types/auth-types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
interface useAuthStoreType {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

export const useAuthStore = create<useAuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
    }),
    {
      name: "auth-store",
    }
  )
)

export const setLogin = (Data: AuthResponse) =>
  useAuthStore.setState((set) => ({
    ...Data,
    isAuthenticated: true,
  }))

export const setLogout = () =>
  useAuthStore.setState(useAuthStore.getInitialState())
