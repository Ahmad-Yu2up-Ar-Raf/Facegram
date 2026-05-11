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
import { useLogout } from "@/hooks/use-auth"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function NavUser() {
  const { isMobile } = useSidebar()
  const user = useAuthStore.getState().user
  const navigate = useNavigate()
  return (
    <SidebarMenu className="border-t p-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              className="gap-3 text-muted-foreground"
            >
              <div className="flex flex-1 gap-3 overflow-scroll">
                <UserAvatar className="size-10" />
                <div className="flex-col">
                  <span className="text-base font-medium text-primary">
                    {user!.name.split(" ")[0]}
                  </span>
                  <span className="block text-xs font-thin text-muted-foreground">
                    {user!.email}
                  </span>
                </div>
              </div>
              <HugeiconsIcon
                icon={ArrowUp01Icon}
                strokeWidth={2}
                className="ms-auto size-3!"
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
              onSelect={() =>
                useLogout({
                  onSucces: () => {
                    navigate("/login")
                    toast.success("Log Out Succes!")
                  },
                  onError: (error) => {
                    toast.error("Log Out Succes!", {
                      description: error.message,
                    })
                  },
                })
              }
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
