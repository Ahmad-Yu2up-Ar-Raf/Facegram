"use client"

import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/fragments/shadcn/sidebar"
import { navGroups } from "@/components/app-shared"
import { NavUser } from "@/components/nav-user"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { LogoAdaptive } from "./ui/fragments/icons/logo-app"
import { Search } from "@hugeicons/core-free-icons"

export function AppSidebar() {
  return (
    <Sidebar
      className="static min-h-full *:data-[slot=sidebar-inner]:bg-background"
      collapsible="offcanvas"
      variant="sidebar"
    >
      <SidebarHeader className="relative h-14 justify-center px-2 py-0">
        <Link
          className="flex h-10 w-max items-center justify-start rounded-2xl px-3 hover:bg-muted dark:hover:bg-muted/50"
          to="#"
        >
          {/* <LogoAdaptive className="scale-[.60]" />
          <h1 className="md:text-1xl font-bold">FoggyNotion</h1> */}
          <Logo className="h-5" />
          <span className="sr-only">Efferd</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-13 pt-2">
        {navGroups.map((group, index) => (
          <SidebarGroup className="" key={`sidebar-group-${index}`}>
            {group.label && (
              <SidebarGroupLabel className="font-normal">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-4.5">
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <Link
                      className={cn(
                        "gap-5 [&>svg]:size-6",
                        item.isActive && "gap-4 [&>svg]:size-7"
                      )}
                      to={item.url}
                    >
                      <HugeiconsIcon
                        className={cn(
                          item.isActive && "fill-primary text-secondary"
                        )}
                        icon={item.icon}
                        strokeWidth={2}
                      />
                      <span
                        className={cn(
                          item.isActive ? "font-bold" : "font-normal",
                          "text-lg"
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        {/* <SidebarMenu className="border-t p-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="text-muted-foreground"
								isActive={item.isActive}
								size="sm"
							>
								<a href={item.url}>
									{item.icon}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
