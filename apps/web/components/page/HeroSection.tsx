import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="p-10 md:p-20">
      <div
        className="min-h-[80vh] flex flex-col justify-between py-10
        lg:flex-row-reverse md:items-center"
      >
        <div className="relative aspect-square h-80 lg:h-[70vh] ">
          <Image
            src="/landing/hero.png"
            alt="hero"
            fill
            className="object-cover "
            loading="eager"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </div>

        <div className="max-w-md h-full flex flex-col justify-center gap-4">
          <div className="text-5xl font-medium md:text-7xl">
            <p>Học,</p>
            <p>Học nữa,</p>
            <p>Học mãi</p>
          </div>
          <p className="max-w-50 md:max-w-screen">
            Cộng đồng học tập, giúp đỡ và phát triển bản thân.
          </p>

          <Button
            variant="default"
            size="lg"
            className="max-w-40 md:mt-8"
            onClick={() =>
              (window.location.href = "https://discord.gg/SWYkNVdXd9")
            }
          >
            Tham gia ngay
          </Button>
        </div>
      </div>
    </section>
  );
}
