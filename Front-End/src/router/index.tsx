import HomePage from "@/pages/home-page"
import LoginPage from "@/pages/login-page"
import RegisterPage from "@/pages/register-page"
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"

import TodoPage from "@/pages/todo-page"
import { useAuthStore } from "@/store/use-auth-store"
import { AppShell } from "@/components/app-shell"

const GuestGuard = () => {
  const isAuth = useAuthStore.getState().isAuthenticated
  return isAuth ? <Navigate to={"/"} /> : <Outlet />
}
const AuthenticatedGuard = () => {
  const isAuth = useAuthStore.getState().isAuthenticated
  return !isAuth ? <Navigate to={"/login"} /> : <Outlet />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/todos",
        element: <TodoPage />,
      },
    ],
    element: <AuthenticatedGuard />,
  },
  {
    element: <GuestGuard />,
    children: [
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <RegisterPage />,
        path: "/register",
      },
    ],
  },
])
