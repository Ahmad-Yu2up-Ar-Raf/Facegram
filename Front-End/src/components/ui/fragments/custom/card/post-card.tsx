import { Card_6 } from "@/components/card-6"
import type { Post } from "@/types/posts-type"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/shadcn/card"
import { cn } from "@/lib/utils"
import UserAvatar from "../user-avatar"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Bookmark02FreeIcons,
  BubbleChatIcon,
  CheckmarkBadge02FreeIcons,
  FavouriteIcon,
  MoreHorizontal,
  RepostIcon,
  Share08FreeIcons,
} from "@hugeicons/core-free-icons"
import { Button } from "../../shadcn/button"
import { useCallback, useState } from "react"
import { api } from "@/api/client"
type componentProps = {
  Post: Post
}

interface actionButton {
  Icon: IconSvgElement
  isActive?: boolean
  activeCollor?: string
  className?: string
  label: number
  action?: () => void
}

const PostCard = ({ Post }: componentProps) => {
  const [isLiked, setLiked] = useState<boolean>(Post.is_liked)
  const [isReposted, setRepost] = useState<boolean>(Post.is_reposted)

  const [likeCount, setLikeCount] = useState<number>(Post.liker_count)
  const [repostCount, setRepostCount] = useState<number>(Post.reposter_count)

  const toggleLike = useCallback(async () => {
    setLiked(!isLiked)

    if (!isLiked) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    await api.post(`posts/${Post.id}/likes`).json<{
      succes: boolean
      message: string
    }>()
  }, [Post.is_liked, isLiked, likeCount, Post.liker_count])

  const toggleRepost = useCallback(async () => {
    setRepost(!isReposted)
    if (!isReposted) {
      setRepostCount(repostCount + 1)
    } else {
      setRepostCount(repostCount - 1)
    }
    await api.post(`posts/${Post.id}/reposts`).json<{
      succes: boolean
      message: string
    }>()
  }, [Post.is_reposted, isReposted, repostCount, Post.reposter_count])

  const postActions: actionButton[] = [
    {
      Icon: BubbleChatIcon,
      label: 2,
    },
    {
      className:
        "  hover:[&_svg]:text-pink-500  hover:bg-pink-500/10  dark:hover:bg-pink-500/10   hover:text-pink-500",
      activeCollor:
        "[&_svg]:fill-pink-500 [&_svg]:text-pink-500 text-pink-500  ",
      isActive: isLiked,
      Icon: FavouriteIcon,
      label: likeCount,
      action: toggleLike,
    },
    {
      className:
        " hover:[&_svg]:text-teal-500 hover:bg-teal-500/10  dark:hover:bg-teal-500/10  hover:text-teal-500",
      activeCollor: "[&_svg]:text-teal-500  text-teal-500",
      isActive: isReposted,
      Icon: RepostIcon,
      label: repostCount,
      action: toggleRepost,
    },
  ]
  console.log("Repost Count:", repostCount)
  return (
    <Card
      className={cn("w-full rounded-none border-none bg-background px-6 py-7")}
    >
      <CardContent className="flex w-full gap-x-4 p-0">
        <UserAvatar className="m-0 size-10 rounded-full p-0" user={Post.user} />
        <div className="-mt-2 w-full">
          <CardHeader className="flex w-full items-center justify-between gap-3 p-0">
            <div className="flex items-center gap-1">
              <CardTitle className="text-sm font-semibold tracking-tight md:text-base">
                {Post.user.name}
              </CardTitle>
              <HugeiconsIcon
                icon={CheckmarkBadge02FreeIcons}
                className="size-4.5 fill-primary text-primary-foreground"
              />
              <p className="text-sm font-thin tracking-tight text-muted-foreground/70">
                <span>@y2ups</span> • <span>1 jam</span>
              </p>
            </div>
            <Button
              className="gap-1 text-muted-foreground"
              variant={"ghost"}
              size={"icon-sm"}
            >
              <HugeiconsIcon
                icon={MoreHorizontal}
                className="size-[17px] text-muted-foreground"
              />
              <p className="sr-only text-[13px] font-light">Saved</p>
            </Button>
          </CardHeader>

          <CardDescription className="text-sm leading-relaxed font-light text-primary">
            {Post.caption}
          </CardDescription>
          <CardFooter className="mt-2 flex w-full justify-between px-0">
            <CardAction className="flex w-fit justify-between gap-7 space-x-7">
              {postActions.map((action, i) => (
                <Button
                  key={i}
                  onClick={action.action}
                  className={cn(
                    "gap-1 text-muted-foreground",

                    action.isActive && action.activeCollor,
                    action.className
                  )}
                  variant={"ghost"}
                  size={"icon-sm"}
                >
                  <HugeiconsIcon
                    strokeWidth={
                      action.Icon == RepostIcon && action.isActive ? 3 : 2
                    }
                    icon={action.Icon}
                    className="size-4.25 text-muted-foreground"
                  />
                  <p className="text-[13px] font-light">{action.label}</p>
                </Button>
              ))}
            </CardAction>
            <div className="">
              <Button
                className="gap-1 text-muted-foreground"
                variant={"ghost"}
                size={"icon-sm"}
              >
                <HugeiconsIcon
                  icon={Bookmark02FreeIcons}
                  className="size-[17px] text-muted-foreground"
                />
                <p className="sr-only text-[13px] font-light">Saved</p>
              </Button>
              <Button
                className="gap-1 text-muted-foreground"
                variant={"ghost"}
                size={"icon-sm"}
              >
                <HugeiconsIcon
                  icon={Share08FreeIcons}
                  className="size-[17px] text-muted-foreground"
                />
                <p className="sr-only text-[13px] font-light">Share</p>
              </Button>
            </div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard
