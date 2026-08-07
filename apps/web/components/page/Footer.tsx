import Link from "next/link";

const quickLinks = [
  {
    title: "Bắt đầu",
    child: [
      {
        title: "Hướng dẫn",
        href: "/",
      },
      { title: "Đăng ký", href: "/" },
    ],
  },
  {
    title: "Đọc thêm",
    child: [
      {
        title: "Blogs",
        href: "/blogs",
      },
      { title: "Nhật ký", href: "/diary" },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="w-full bg-blue-50 py-8 px-8 md:px-16 space-y-4 text-black">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="max-w-[50vw] space-y-2">
          <h2 className="text-xl font-bold">Odyssey</h2>
          <p>Cộng đồng học tập, giúp đỡ và phát triển bản thân.</p>
        </div>
        <div className="flex  gap-16">
          {quickLinks.map((link, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h6>{link.title}</h6>
              <div className="flex flex-col gap-1">
                {link.child.map((child, index) => (
                  <Link href={child.href} key={index}>
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-300 h-0.25 w-full"></div>

      <div>
        <p>Copyright (c) 2026 Cộng đồng Odyssey. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
