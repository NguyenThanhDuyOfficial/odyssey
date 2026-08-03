"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    message:
      "Thứ ảnh hưởng nhóm lớn nhất đến em chắc là động lực và kiên trì. Từ 1 đứa lười như em vậy mà từ khi vào nhóm ngày nào cùng vào học cùng mng. (Còn nhiều thứ những nma ko bt nói nó ra lm sao :)))",
  },
  {
    message:
      "Giúp e tốt hơn ( cả về suy nghĩ, hành động và bài học ) có thể là ko thể tuyệt đối nhưng đã tiến bộ hơn trước và gặp mấy bn xinh iu và dễ thương ạ ",
  },
  {
    message:
      "Nhóm cực kỳ dễ thương, mọi người thân thiện. Em cảm ơn nhóm nhiều ạ.",
  },
  {
    message:
      "Trưởng nhóm thân thiện, đẹp trai và tốt ạ. Em thích các bài viết của nhóm lắm ạ, mong rằng sẽ có nhiều bài viết hơn.",
  },
  {
    message:
      "Em học được rất nhiều thứ từ nhóm kể từ khi em tham gia, em đã vui hơn, đồng thời cũng học được rất nhiều thứ.",
  },
];

export default function ReviewSection() {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      id="review"
      className="p-8 md:p-16 w-full flex flex-col gap-8 bg-blue-50"
    >
      <h2 className="w-full text-center">Mọi người nói gì về Odyssey?</h2>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="py-4">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-[calc(100%/3.5)]">
              <div className="p-4 h-full flex items-center justify-center bg-background rounded-lg shadow-lg">
                <p>{review.message}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center items-center gap-2">
        {reviews.map((review, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
            }}
            className={`w-3 h-3 rounded-full transistion-all duration-300 ${
              index === current
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
