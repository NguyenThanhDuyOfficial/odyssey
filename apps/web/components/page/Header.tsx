"use client";

import { Menu, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { loginWithDiscord, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    console.log(user);
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = async () => {
    logout();
  };
  const handleLogin = async () => {
    loginWithDiscord();
  };
  return (
    <header
      className={`sticky text-black top-0 left-0 z-50 h-16 w-full p-4 px-8 md:px-16 flex justify-between items-center transistion-color duration-300 ${isScrolled ? "bg-zinc-50" : "bg-transparent"}`}
    >
      <Link href="/" className="text-xl font-medium" aria-label="go to home">
        Odyssey
      </Link>
      <div className="hidden md:block space-x-8">
        <Link className="link" href="/docs" aria-label="go to wiki">
          Hướng dẫn
        </Link>
        <Link className="link" href="/blog/blog" aria-label="go to blog">
          Bài Blogs
        </Link>
      </div>
      <Button
        className="md:hidden"
        variant="ghost"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <XIcon className="w-6! h-6!" />
        ) : (
          <MenuIcon className="w-6! h-6!" />
        )}
      </Button>
      {/* <div className="space-x-4 hidden md:block"> */}
      {/*   <Link className="link" href=""> */}
      {/*     Tham gia */}
      {/*   </Link> */}
      {/*   <Button variant="ghost">Đăng nhập</Button> */}
      {/* </div> */}

      <div
        className={`fixed top-16 right-0 w-fit h-fit bg-zinc-100 p-8 rounded-bl-lg
${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col gap-4 justify-center items-center">
          <Link className="link" href="/docs" aria-label="go to wiki">
            Hướng dẫn
          </Link>
          <Link className="link" href="/blog/blog" aria-label="go to blog">
            Bài Blogs
          </Link>
        </div>
      </div>
      {isAuthenticated ? (
        <div>
          <p>{user?.name}</p>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleLogin}>Đăng nhập</Button>
        </div>
      )}
    </header>
  );
}
