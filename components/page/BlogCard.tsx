import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  src,
  title,
  href,
  type,
}: {
  src: any;
  title: any;
  href: any;
  type: any;
}) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-100">
      <Link href={href} className="relative w-full aspect-video ">
        <Image
          src={src}
          alt="Card Image"
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        ></Image>
      </Link>
      <div className="space-y-2">
        <p className="text-blue-400">{type}</p>
        <h4>{title}</h4>
      </div>
    </div>
  );
}
