'use client'
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { wikis } from "@/.velite"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky top-0 z-10 left-0 bg-white p-4 h-16 border-b border-zinc-300 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold link">Odyssey</Link>
      <Button className="md:hidden" variant="ghost" onClick={() => { setIsOpen(!isOpen) }}>
        {isOpen ? <XIcon className="w-6! h-6!" /> : <MenuIcon className="w-6! h-6!" />}
      </Button>


      <div className={`fixed top-16 right-0 w-full h-[calc(100vh-4rem)] bg-zinc-100 p-8 rounded-bl-lg
${isOpen ? 'max-h-[calc(100vh-4rem] opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
        <div className="flex flex-col gap-4 justify-center items-center">
          {wikis.map((wiki, index) => (
            <Button key={index} variant="ghost" className="w-full rounded-xs" ><Link className="link" href={wiki.permalink}>{wiki.title}</Link></Button>
          ))}
        </div>
      </div>
    </header>
  )
}
