import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/use-auth-store"

const AuthMiddleware = () => {
  const isAuthorization = useAuthStore.getState().isAuthenticated

  if (!isAuthorization) {
    return <Navigate to={"/login"} />
  }
  return <Outlet />
}

export default AuthMiddleware
