import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/fragments/shadcn/button"
import { Separator } from "@/components/ui/fragments/shadcn/separator"
import { SidebarTrigger } from "@/components/ui/fragments/shadcn/sidebar"
import { AppBreadcrumbs } from "@/components/app-breadcrumbs"
import { navLinks } from "@/components/app-shared"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  Notification,
  CustomerSupportIcon,
} from "@hugeicons/core-free-icons"

const activeItem = navLinks.find((item) => item.isActive)

export function AppHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 bg-background px-4 md:px-6"
      )}
    >
      {/* <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Separator
          className="me-2 data-[orientation=vertical]:h-4 md:hidden"
          orientation="vertical"
        />
        <AppBreadcrumbs page={activeItem} />
      </div> */}
      {/* <div className="flex items-center gap-2">
        <Button aria-label="Search" size="icon" variant="ghost">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </Button>
        <Button aria-label="Notifications" size="icon" variant="ghost">
          <HugeiconsIcon icon={Notification} strokeWidth={2} />
        </Button>
        <Button aria-label="Support" size="icon" variant="ghost">
          <HugeiconsIcon icon={CustomerSupportIcon} strokeWidth={2} />
        </Button>
      </div> */}
    </header>
  )
}
