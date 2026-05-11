import { FullWidthDivider } from "@/components/ui/fragments/shadcn/full-width-divider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/shadcn/sidebar"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
import { DecorIcon } from "./ui/fragments/icons/decor-icon"

export function AppShell() {
  return (
    <>
      <DecorIcon
        className="rigth-0 z-999999999999999999999 top-14 right-58 size-6"
        position="top-right"
      />
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
