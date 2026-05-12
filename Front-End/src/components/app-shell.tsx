import { FullWidthDivider } from "@/components/ui/fragments/shadcn/full-width-divider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/shadcn/sidebar"
 
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
 
export function AppShell() {
  return (
    <>
      <div className="overflow-hidden">
        <SidebarProvider className="relative mx-auto h-svh w-full max-w-5xl lg:border-x">
          <FullWidthDivider className="top-14 z-60 hidden -translate-y-px md:flex" />
          <AppSidebar />
          <SidebarInset>
            <Outlet />

            {/* <AppHeader /> */}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  )
}
