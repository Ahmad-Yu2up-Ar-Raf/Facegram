import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Analytics02Icon,
  Briefcase02Icon,
  UserMultipleIcon,
  Plug01Icon,
  Key01Icon,
  Settings01Icon,
  Navigation03Icon,
  HelpCircleIcon,
  BookOpen01Icon,
  Search,
  Home01FreeIcons,
  Notification,
  BubbleChatIcon,
  Bookmark01FreeIcons,
  Bookmark02FreeIcons,
  User,
  Home03Icon,
  Home04Icon,
  DiscoverCircleIcon,
  Note05FreeIcons,
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
    // label: "Product",
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
        icon: DiscoverCircleIcon,
      },
      {
        title: "Todos",
        url: "/todos",
        icon: Note05FreeIcons,
      },
      {
        title: "Notification",
        url: "/notification",
        icon: Notification,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: BubbleChatIcon,
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
    // label: "",
    items: [
      {
        title: "Settings",
        url: "#/settings",
        icon: Settings01Icon,
      },
    ],
  },
]

// export const footerNavLinks: SidebarNavItem[] = [
//   {
//     title: "Feedback",
//     url: "#/feedback",
//     icon: (
//       <HugeiconsIcon
//         icon={Navigation03Icon}
//         strokeWidth={2}
//         data-icon="inline-start"
//       />
//     ),
//   },
//   {
//     title: "Help Center",
//     url: "#/help",
//     icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
//   },

//   {
//     title: "Documentation",
//     url: "#/documentation",
//     icon: <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={2} />,
//   },
// ]

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) => group.items),
  // ...footerNavLinks,
]
