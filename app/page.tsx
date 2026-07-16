"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";

const reviews = [
  {
    message: "Thứ ảnh hưởng nhóm lớn nhất đến em chắc là động lực và kiên trì. Từ 1 đứa lười như em vậy mà từ khi vào nhóm ngày nào cùng vào học cùng mng. (Còn nhiều thứ những nma ko bt nói nó ra lm sao :)))"
  },
  {
    message: "Giúp e tốt hơn ( cả về suy nghĩ, hành động và bài học ) có thể là ko thể tuyệt đối nhưng đã tiến bộ hơn trước và gặp mấy bn xinh iu và dễ thương ạ "
  },
  {
    message: "Thứ ảnh hưởng nhóm lớn nhất đến em chắc là động lực và kiên trì. Từ 1 đứa lười như em vậy mà từ khi vào nhóm ngày nào cùng vào học cùng mng. (Còn nhiều thứ những nma ko bt nói nó ra lm sao :)))"
  },
  {
    message: "Giúp e tốt hơn ( cả về suy nghĩ, hành động và bài học ) có thể là ko thể tuyệt đối nhưng đã tiến bộ hơn trước và gặp mấy bn xinh iu và dễ thương ạ "
  },
]
export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const { theme, setTheme } = useTheme()
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  useEffect(() => {
    setIsClient(true)
    if (theme === 'dark')
      setTheme('light')
  }, [])
  return (
    <>
      <Header />
      <div className="space-y-8 pb-8 bg-white text-black">

        {/* HERO */}
        <section id="hero" className="bg-[#f8f8f8] p-8 md:p-16">
          <div className="flex flex-col justify-between min-h-[70vh] lg:flex-row-reverse md:items-center">
            <div className="relative aspect-4/3 h-80 lg:h-[70vh]">
              <Image
                src="/hero.png"
                alt="hero"
                fill
                className="object-cover"
                loading="eager"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </div>

            <div className="max-w-md h-full flex flex-col justify-center gap-8">
              <div className="text-5xl font-medium md:text-7xl">
                <p>Học,</p>
                <p>Học nữa,</p>
                <p>Học mãi</p>
              </div>
              <p>Gặp gỡ, kết bạn, học tập với những học giả đến từ khắp Việt Nam.</p>
              <Button variant="default" className="max-w-40">Tham gia ngay</Button>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="px-8 md:px-16  space-y-6">
          <h1 className="border-none">Nhóm chúng mình có gì?</h1>
          <div className="space-y-4 md:grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-100 rounded-lg space-y-2">
              <h2>Tri thức là vô giá</h2>
              <p>Cộng đồng có nhiều sự kiện khuyến khích mọi người chia sẻ kiến thức, cảm nhận, cảm xúc về sách, phim, câu chuyện... để bạn học hỏi và phát triển mỗi ngày.</p>
            </div>
            <div className="p-4 bg-zinc-100 rounded-lg space-y-2">
              <h2>Học đi đôi với hành</h2>
              <p>Discord có các Bot và phòng chia theo thể loại nhằm hỗ trợ các bạn trong việc học tập chung, viết nhật ký, todo, chia sẻ những thứ mình học được, giao tiếp kết bạn với mọi người.</p>
            </div>
            <div className="p-4 bg-zinc-100 rounded-lg space-y-2">
              <h2>Tỏa hương</h2>
              <p>Cộng đồng có rất nhiều thành viên dễ thương, sẵn sàng hỗ trợ giúp đỡ bạn trong các vấn đề học tập, xã hội, gia đình, và cả chính bản thân. Hãy hỏi khi có thắc mắc nhé.</p>
            </div>
            <div className="p-4 bg-zinc-100 rounded-lg space-y-2">
              <h2>Nỗ lực là sự khởi đầu</h2>
              <p>Cuối cùng là sự nỗ lực của chính bạn, hãy sống cố gắng hết sức, học hỏi điều hay, tránh xa lẽ trái, cố gắng mỗi ngày, giúp đỡ mọi người. Thì dù vận mệnh có thế nào, bạn vẫn sẽ hạnh phúc.</p>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        {isClient &&
          <section className="px-8 md:px-16 w-full flex flex-col gap-8">
            <h1 className="border-none">Mọi người nghĩ gì về nhóm chúng mình?</h1>
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full max-w-[60vw] md:max-w-[90vw] self-center"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="basis md:basis-1/3">
                    <div className="p-4 bg-zinc-100 rounded-lg  max-h-60 overflow-auto">
                      <p>{review.message}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        }
      </div >
      <Footer />
    </>
  );
}
