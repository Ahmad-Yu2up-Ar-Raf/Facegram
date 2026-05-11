import { type IconSvgElement } from "@hugeicons/react"
import {
  Settings01Icon,
  Notification,
  BubbleChatIcon,
  Bookmark02FreeIcons,
  User,
  Home04Icon,
  DiscoverCircleIcon,
  Note05FreeIcons,
  Search,
  Navigation03Icon,
  HelpCircleIcon,
  BookOpen01Icon,
  Hamburger,
} from "@hugeicons/core-free-icons"

export type SidebarNavItem = {
  title: string
  url: string

  isActive?: boolean
  icon: IconSvgElement
}

export type SidebarNavGroup = {
  label?: string
  items: SidebarNavItem[]
}

export const navGroups: SidebarNavGroup[] = [
  {
    label: "Pages",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home04Icon,
        isActive: true,
      },
      {
        title: "Explore",
        url: "/explore",
        icon: Search,
      },

      {
        title: "Notification",
        url: "/notification",
        icon: Notification,
      },

      {
        title: "Bookmarks",
        url: "/bookmarks",
        icon: Bookmark02FreeIcons,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
    ],
  },
  {
    label: "App",
    items: [
      {
        title: "Todos",
        url: "/todos",
        icon: Note05FreeIcons,
      },

      {
        title: "Chat",
        url: "/chat",
        icon: BubbleChatIcon,
      },
    ],
  },
  // {
  //   label: "",
  //   items: [
  //     {
  //       title: "Settings",
  //       url: "#/settings",
  //       icon: Settings01Icon,
  //     },
  //   ],
  // },
]

export const footerNavLinks: SidebarNavItem[] = [
  // {
  //   title: "Settings",
  //   url: "#/settings",
  //   icon: Settings01Icon,
  // },
  {
    title: "More",
    url: "#/help",
    icon: Hamburger,
  },
]

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) => group.items),
  // ...footerNavLinks,
]
