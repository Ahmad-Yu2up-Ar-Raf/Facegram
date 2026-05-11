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
import { footerNavLinks, navGroups } from "@/components/app-shared"
import { NavUser } from "@/components/nav-user"
import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import { DecorIcon } from "./ui/fragments/icons/decor-icon"

export function AppSidebar() {
  return (
    <Sidebar
      className="static min-h-full *:data-[slot=sidebar-inner]:bg-background"
      collapsible="offExamples"
      variant="sidebar"
    >
      <DecorIcon className="top-14 left-0 z-50 size-5" position="top-left" />
      <DecorIcon className="top-14 left-64 z-50 size-5" position="top-left" />
      <DecorIcon
        className="bottom-13 left-0 z-50 size-5"
        position="bottom-left"
      />
      <DecorIcon
        className="bottom-13 left-64 z-50 size-5"
        position="bottom-left"
      />
      {/* <DecorIcon
        className="bottom-25.5 left-0 z-50 size-5"
        position="bottom-left"
      />
      <DecorIcon
        className="bottom-25.5 left-64 z-50 size-5"
        position="bottom-left"
      /> */}
      <DecorIcon className="rigth-0 top-14 z-50 size-5" position="top-right" />
      <SidebarHeader className="relative h-14 justify-center px-2 py-0">
        <Link
          className="flex h-10 w-max items-center justify-center rounded-lg px-3 hover:bg-muted dark:hover:bg-muted/50"
          to="#"
        >
          <Logo className="h-4" />
          <span className="sr-only">Efferd</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, index) => (
          <SidebarGroup key={`sidebar-group-${index}`}>
            {group.label && (
              <SidebarGroupLabel className="font-normal">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="">
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="rounded-none"
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <Link
                      className={cn(
                        "gap-4 [&>svg]:size-4",
                        item.isActive && "gap-3 [&>svg]:size-5"
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
                          "text-sm",
                          item.isActive ? "font-bold" : "font-light"
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
        <SidebarMenu className="p-3">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="gap-4 rounded-none text-muted-foreground"
                isActive={item.isActive}
                size="sm"
              >
                <Link to={item.url}>
                  <HugeiconsIcon
                    // className={cn(
                    //   item.isActive && "fill-primary text-secondary"
                    // )}
                    icon={item.icon}
                    strokeWidth={2}
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
