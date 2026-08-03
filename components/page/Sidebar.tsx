"use client";

import { wikis, blogs } from "@/.velite";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isBlog = pathname?.startsWith("/blog");
  const data = isBlog ? blogs : wikis;

  return (
    <div className="p-4 hidden md:flex sticky z-9 top-16 left-0 w-60 min-w-60 h-[calc(100vh-4rem)] flex-col justify-between">
      <div className="flex flex-col">
        {data
          .sort((a, b) => (a.priority || 0) - (b.priority || 0))
          .map((wiki, index) => (
            <Button key={index} variant="ghost" className="w-full rounded-xs ">
              <Link className="w-full text-left" href={wiki.permalink}>
                {wiki.title}
              </Link>
            </Button>
          ))}
      </div>
      <div>
        <Button
          onClick={() => {
            theme === "light" ? setTheme("dark") : setTheme("light");
          }}
        >
          Dark/Light
        </Button>
      </div>
    </div>
  );
}
