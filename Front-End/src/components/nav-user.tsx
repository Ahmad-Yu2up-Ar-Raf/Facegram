"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/fragments/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/fragments/shadcn/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/fragments/shadcn/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUp01Icon,
  UserIcon,
  Notification,
  Settings01Icon,
  Logout02Icon,
} from "@hugeicons/core-free-icons"
import UserAvatar from "./ui/fragments/custom/user-avatar"
import { useAuthStore } from "@/store/use-auth-store"

import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useLogout } from "@/hooks/use-auth"

export function NavUser() {
  const { isMobile } = useSidebar()
  const user = useAuthStore.getState().user
  const navigate = useNavigate()
  const { handleLogout } = useLogout()
  return (
    <SidebarMenu className="border-t p-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="rounded-none text-muted-foreground">
              <UserAvatar />
              <span className="text-sm font-medium">
                {user?.name.split(" ")[0]}
              </span>
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="ml-auto size-3!"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-48"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Notification} strokeWidth={2} />
                Notifications
              </DropdownMenuItem>

              <DropdownMenuItem>
                <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                handleLogout({
                  onLoading: () => {
                    toast.loading("Log Out...", { id: "log-out" })
                  },
                  onSucces: () => {
                    navigate("/login")
                    toast.success("Log Out Success!", { id: "log-out" })
                  },
                  onError: (error) => {
                    toast.error("Log Out Failed!", {
                      id: "log-out",
                      description: error.message,
                    })
                  },
                })
              }}
              variant="destructive"
            >
              <HugeiconsIcon icon={Logout02Icon} strokeWidth={2} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
