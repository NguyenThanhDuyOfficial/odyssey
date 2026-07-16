"use client"

import { Menu, MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky text-black top-0 left-0 z-50 h-16 w-full bg-zinc-100 p-4 px-8 md:px-16 flex justify-between items-center">
      <Link href="/" className="text-xl font-medium">Odyssey</Link>
      <div className="hidden md:block space-x-8">
        <Link className="link" href="/wiki/wiki">Hướng dẫn</Link>
        <Link className="link" href="/blog/blog">Bài Blogs</Link>
      </div>
      <Button className="md:hidden" variant="ghost" onClick={() => { setIsOpen(!isOpen) }}>
        {isOpen ? <XIcon className="w-6! h-6!" /> : <MenuIcon className="w-6! h-6!" />}
      </Button>
      <div className="space-x-4 hidden md:block">
        <Link className="link" href="">Tham gia</Link>
        <Button variant="ghost">Đăng nhập</Button>
      </div>

      <div className={`fixed top-16 right-0 w-fit h-fit bg-zinc-100 p-8 rounded-bl-lg
${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Link className="link" href="/wiki/wiki">Hướng dẫn</Link>
          <Link className="link" href="/blog/blog">Bài Blogs</Link>
        </div>
      </div>

    </header>
  )
}
