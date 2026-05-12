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

import { usePost } from "@/hooks/posts/use-post"
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
  const {
    isLiked,
    likeCount,
    isReposted,
    repostCount,
    handleBookmark,
    isBookmark,
    handdleToggleLike,
    handdleToggleRepost,
  } = usePost(Post)

  const postActions: actionButton[] = [
    {
      className:
        "  hover:[&_svg]:text-destructive  hover:bg-destructive/10  dark:hover:bg-destructive/10   hover:text-destructive",
      activeCollor:
        "[&_svg]:fill-destructive [&_svg]:text-destructive text-destructive  ",
      isActive: isLiked,
      Icon: FavouriteIcon,
      label: likeCount,
      action: handdleToggleLike,
    },
    {
      Icon: BubbleChatIcon,
      label: 2,
    },

    {
      className:
        " hover:[&_svg]:text-teal-500 hover:bg-teal-500/10  dark:hover:bg-teal-500/10  hover:text-teal-500",
      activeCollor: "[&_svg]:text-teal-500  text-teal-500",
      isActive: isReposted,
      Icon: RepostIcon,
      label: repostCount,
      action: handdleToggleRepost,
    },
  ]
  console.log("Repost Count:", repostCount)
  return (
    <Card
      className={cn(
        "h-full w-full rounded-none border-b bg-background px-6 py-7 ring-0"
      )}
    >
      <CardContent className="flex w-full gap-x-4 p-0">
        <div className="">
          <UserAvatar
            showFollow
            className="m-0 size-10 rounded-full p-0"
            user={Post.user}
          />
        </div>
        <div className="-mt-1.5 w-full gap-0">
          <CardHeader className="flex w-full items-center justify-between gap-2 p-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-semibold tracking-tight">
                {Post.user.name}
              </CardTitle>
              {/* <HugeiconsIcon
                icon={CheckmarkBadge02FreeIcons}
                className="size-4.5 fill-primary text-primary-foreground"
              /> */}
              <p className="text-sm font-thin tracking-tight text-muted-foreground/70">
                1 jam
              </p>
            </div>
            <Button
              className="gap-1 text-muted-foreground"
              variant={"ghost"}
              size={"icon-sm"}
            >
              <HugeiconsIcon
                icon={MoreHorizontal}
                className="size-4.25 text-muted-foreground"
              />
              <p className="sr-only text-[13px] font-light">Saved</p>
            </Button>
          </CardHeader>

          <CardDescription className="text-sm leading-relaxed font-light text-primary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
            iste dolor aperiam nulla nesciunt, perferendis perspiciatis debitis
            libero excepturi veritatis incidunt sint officiis atque nostrum
            voluptatibus ex asperiores pariatur delectus?
          </CardDescription>
          <CardFooter className="mt-2.5 flex w-full justify-between px-0">
            <CardAction className="-ml-3 flex w-fit justify-between gap-2 space-x-0 px-0">
              {postActions.map((action, i) => (
                <Button
                  key={i}
                  onClick={action.action}
                  className={cn(
                    "gap-1.5 text-muted-foreground",

                    action.isActive && action.activeCollor,
                    action.className
                  )}
                  variant={"ghost"}
                  size={"sm"}
                >
                  <HugeiconsIcon
                    strokeWidth={
                      action.Icon == RepostIcon && action.isActive ? 3 : 2
                    }
                    icon={action.Icon}
                    className="size-4 text-muted-foreground"
                  />
                  <p className="text-xs font-light">{action.label}</p>
                </Button>
              ))}
            </CardAction>
            <div className="">
              <Button
                className="gap-1 text-muted-foreground hover:bg-sky-500/10 hover:text-sky-500 dark:hover:bg-sky-500/10 hover:[&_svg]:text-sky-500"
                variant={"ghost"}
                onClick={handleBookmark}
                size={"icon-sm"}
              >
                <HugeiconsIcon
                  icon={Bookmark02FreeIcons}
                  className={cn(
                    "size-4.25 text-muted-foreground",
                    isBookmark && "fill-sky-600 text-sky-600"
                  )}
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
                  className="size-4.25 text-muted-foreground"
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
