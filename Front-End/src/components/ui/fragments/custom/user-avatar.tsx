import { Avatar, AvatarFallback } from "@/components/ui/fragments/shadcn/avatar"
import { useInitials } from "@/hooks/user-initial"
import { useAuthStore } from "@/store/use-auth-store"

import type { User } from "@/types/auth-types"

// import { useAuth, useUser } from '@clerk/clerk-expo';

import * as React from "react"

type componentProps = {
  user?: User
}

export default function UserAvatar({
  user,
  ...props
}: componentProps & Omit<React.ComponentProps<typeof Avatar>, "alt">) {
  const userData = user ?? useAuthStore.getState().user
  // const user = useAuthStore.getState().user
  const initial = useInitials()
  return (
    <Avatar {...props}>
      {/* <AvatarImage src="https://github.com/Ahmad-Yu2up-Ar-Raf/sundress/blob/main/public/assets/images/default-avaatarjpg.jpg?raw=true" /> */}
      <AvatarFallback>
        <p>{initial(userData?.name!)}</p>
      </AvatarFallback>
    </Avatar>
  )
}
