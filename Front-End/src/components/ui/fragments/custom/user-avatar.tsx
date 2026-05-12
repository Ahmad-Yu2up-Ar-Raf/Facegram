import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/fragments/shadcn/avatar"
import { useInitials } from "@/hooks/user-initial"
import { useAuthStore } from "@/store/use-auth-store"

import type { User } from "@/types/auth-types"
import {
  AddCircleFreeIcons,
  BubbleChatIcon,
  UserPlus,
  UserX,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import * as React from "react"
import { Button } from "../shadcn/button"
import { UserAvatarHover } from "@/components/avatar-hover-card"
import { useUser } from "@/hooks/user/use-user"

type componentProps = {
  user?: User
  showFollow?: boolean
  detailUser?: boolean
}

export default function UserAvatar({
  user,

  showFollow,
  detailUser,
  ...props
}: componentProps & Omit<React.ComponentProps<typeof Avatar>, "alt">) {
  const userData = user ?? useAuthStore.getState().user

  const { handleFollow } = useUser()
  const handleFollowUSer = () => handleFollow(userData?.id!, userData?.name!)
  const isFollowed = userData?.is_followed ?? false
  const initial = useInitials()
  return (
    <div className="relative w-fit">
      {detailUser ? (
        <UserAvatarHover
          imageSrc={userData?.avatar!}
          imageAlt="Profile"
          name={userData?.name!}
          variant="glass"
          size="sm"
          username={userData?.email}
          description="Community manager and content creator."
          buttonContent={
            user && (
              <Button
                onClick={handleFollowUSer}
                variant={isFollowed ? "secondary" : "default"}
                size="sm"
                className="w-full flex-1"
              >
                <HugeiconsIcon
                  icon={isFollowed ? UserX : UserPlus}
                  className="sr-only mr-2 h-4 w-4"
                />
                {isFollowed ? "UnFollow" : "Follow"}
              </Button>
            )
          }
        />
      ) : (
        <Avatar {...props}>
          <AvatarImage src={userData?.avatar} alt={userData?.name} />
          <AvatarFallback className="text-xs">
            {initial(userData?.name!)}
          </AvatarFallback>
        </Avatar>
      )}
      {!isFollowed && showFollow && (
        <Button
          onClick={handleFollowUSer}
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
