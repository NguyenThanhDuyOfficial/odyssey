import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-[#f8f8f8] p-4 px-8 md:px-16 flex justify-between items-center">
      <p className="text-xl font-medium">Odyssey</p>
      <div className="hidden md:block space-x-8">
        <Link href="/guides">Hướng dẫn</Link>
        <Link href="/blogs">Bài Blogs</Link>
      </div>
      <MenuIcon className="md:hidden" />
      <div className="space-x-4">
        <Link href="">Tham gia</Link>
        <Button variant="ghost">Đăng nhập</Button>
      </div>
    </header>
  )
}
