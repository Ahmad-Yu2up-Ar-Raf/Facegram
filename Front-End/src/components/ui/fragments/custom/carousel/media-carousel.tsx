"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/fragments/shadcn/carousel"

import { cn } from "@/lib/utils"
import MediaItem from "../media-item"

type componentProps = {
  media: string[]
}

export default function MediaCarousel({ media }: componentProps) {
  return (
    <Carousel
      opts={{
        align: "start",

        skipSnaps: false,
        breakpoints: {
          "(max-width: 768px)": {
            dragFree: true,
          },
        },
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {media.map((url, i) => (
          <CarouselItem
            className={cn(
              "pl-2",
              "basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            )}
          >
            <MediaItem
              webViewLink={url}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
