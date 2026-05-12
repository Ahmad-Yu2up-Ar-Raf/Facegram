"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/fragments/shadcn/avatar"
import { Button } from "@/components/ui/fragments/shadcn/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { type ReactNode, useState } from "react"

export interface NativeHoverCardProps {
  /**
   * Image source URL
   */
  imageSrc: string
  /**
   * Alt text for the image
   */
  imageAlt?: string
  /**
   * Display name
   */
  name: string
  /**
   * Username or handle
   */
  username?: string
  /**
   * Description or bio text
   */
  description?: string
  /**
   * Button text
   * Default: "View Profile"
   */
  buttonText?: string
  /**
   * Button click handler
   */
  onButtonClick?: () => void
  /**
   * Custom button component
   */
  buttonContent?: ReactNode
  /**
   * Size of the image when collapsed
   * Default: "md"
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Additional class names for the container
   */
  className?: string
  /**
   * Card variant style
   */
  variant?: "default" | "glass" | "bordered"
}

const imageSizeVariants = {
  sm: "size-10",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function UserAvatarHover({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  variant = "default",
}: NativeHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-background/80 backdrop-blur-md border border-border/50"
      case "bordered":
        return "bg-card border-2 border-primary/20"
      default:
        return "bg-card border border-border"
    }
  }

  // Avatar component - renders a fresh instance to ensure updates/animations work
  const avatarElement = (
    <Avatar className="h-full w-full">
      <AvatarImage
        src={imageSrc || "/images/placeholder/avatar-placeholder.jpgg"}
        alt={imageAlt || name}
      />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )

  return (
    <motion.div
      className={cn("hit-area-1 relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: isHovered ? "auto" : "fit-content",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-full",
          imageSizeVariants[size]
        )}
        layout
        animate={{
          padding: isHovered ? "8px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {avatarElement}
      </motion.div>

      {/* Expanded Card Content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute -start-4 -top-3 z-10 w-fit overflow-hidden rounded-xl px-3.5 py-3 pr-5 shadow-lg",

              getVariantStyles()
            )}
            style={{ pointerEvents: "auto" }}
          >
            {/* Background with gradient overlay on image */}
            <div className="relative space-y-4">
              <div className={cn("relative", imageSizeVariants[size])}>
                {avatarElement}
              </div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                }}
                className="flex-1 space-y-5"
              >
                {/* Name */}
                <div className="flex flex-col items-start gap-0">
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-base leading-tight font-bold text-foreground"
                  >
                    {name}
                  </motion.h3>

                  {/* Username */}
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-sm text-muted-foreground"
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>

                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="line-clamp-2 text-sm leading-relaxed text-foreground/80"
                  >
                    {description}
                  </motion.p>
                )}

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button
                      onClick={onButtonClick}
                      size="sm"
                      className="w-full"
                    >
                      {buttonText}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
