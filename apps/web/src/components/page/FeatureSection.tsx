"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    imageUrl: "/landing/blogs.png",
    title: "Blogs",
    description:
      "Những bài học được chia sẻ bởi những học giả nhiệt huyết, chọn lọc và kiểm duyệt kỹ càng. Hứa hẹn mang đến nhiều kiến thức thú vị.",
  },
  {
    imageUrl: "/landing/diary.jpg",
    title: "Nhật Ký",
    description:
      "Quan sát bản thân mình mỗi ngày đồng thời học hỏi mọi người thông qua nhật ký của họ. Mỗi ngày học 1 điều mới.",
  },
  {
    imageUrl: "/landing/community.jpg",
    title: "Cộng Đồng",
    description:
      "Cộng đồng với những học giả dễ thương, sẵn sàng chia sẻ, giúp đỡ và hướng dẫn lẫn nhau tùy theo hiểu biết từng người.",
  },
  {
    imageUrl: "/landing/todolist.png",
    title: "Todolist",
    description:
      "Xây dựng mục tiêu, todo và hoàn thành mỗi ngày cùng với cộng đồng. Nhận nhiều phần thưởng hấp dẫn cũng như hoàn thành mục tiêu bản thân.",
  },
  {
    imageUrl: "/landing/chalenge.jpg",
    title: "Thử Thách",
    description:
      "Thách thức bản thân với các thử thách tháng hoặc năm của cộng đồng, nhằm phát triển bản thân và đạt nhiều phần thưởng hấp dẫn.",
  },
];

export default function FeatureSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

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
    <section id="feature" className="pb-8">
      <h2 className="w-full text-center">Odyssey Có Gì? </h2>
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent className="p-8">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="md:basis-[calc(100%/3.5)]">
              <div className="p-8 md:p-8 min-w-0 bg-card text-card-foreground rounded-lg shadow-xl space-y-4 ">
                <div className="relative w-full aspect-video rounded-lg ">
                  <Image
                    src={feature.imageUrl}
                    alt="feature image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center items-center gap-2">
        {features.map((feature, index) => (
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
