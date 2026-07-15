import { wikis } from "@/.velite"
import { Button } from "../ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="p-4 hidden md:block sticky z-9 top-16 left-0 w-50 flex-col justify-between">
      <div className="flex flex-col">
        {wikis.map((wiki, index) => (
          <Button key={index} variant="ghost" className="w-full rounded-xs" ><Link className="link" href={wiki.permalink}>{wiki.title}</Link></Button>
        ))
        }
      </div>
      <div>
        <Button onClick={() => { theme === "light" ? setTheme('dark') : setTheme('light') }}>Dark/Light</Button>
      </div>
    </div >
  )
}
