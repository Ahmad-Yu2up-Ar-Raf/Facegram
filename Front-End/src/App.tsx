import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Toaster } from "./components/ui/fragments/shadcn/sonner"
import { TooltipProvider } from "./components/ui/fragments/shadcn/tooltip"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
