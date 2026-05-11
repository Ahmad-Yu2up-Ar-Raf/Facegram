import { Avatar, AvatarFallback } from "@/components/ui/fragments/shadcn/avatar"
import { useInitials } from "@/hooks/user-initial"
import { useAuthStore } from "@/store/use-auth-store"

import type { User } from "@/types/auth-types"
import { AddCircleFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

// import { useAuth, useUser } from '@clerk/clerk-expo';

import * as React from "react"
import { Button } from "../shadcn/button"

type componentProps = {
  user?: User
  showFollow?: boolean
}

export default function UserAvatar({
  user,
  showFollow,
  ...props
}: componentProps & Omit<React.ComponentProps<typeof Avatar>, "alt">) {
  const userData = user ?? useAuthStore.getState().user
  // const user = useAuthStore.getState().user
  const initial = useInitials()
  return (
    <div className="relative w-fit">
      <Avatar {...props}>
        {/* <AvatarImage
          src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
          alt="Hallie Richards"
        /> */}
        <AvatarFallback className="text-xs">
          {initial(userData?.name!)}
        </AvatarFallback>
      </Avatar>
      {showFollow && (
        <Button
          size={"icon-xs"}
          variant={"ghost"}
          className="absolute -right-1 -bottom-2 inline-flex cursor-pointer items-center justify-center rounded-full border-[0px] border-background bg-background p-0 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <HugeiconsIcon
            icon={AddCircleFreeIcons}
            className="size-5 fill-primary text-background"
          />
          <span className="sr-only">Add</span>
        </Button>
      )}
    </div>
  )
}
