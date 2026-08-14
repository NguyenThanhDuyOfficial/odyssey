"use client";

import Image from "next/image";
import { getDiscordAvatarUrl } from "@/utils/discord";

interface DiscordAvatarProps {
  discordId: string;
  avatar: string | null;
  discriminator?: string;
  size?: 16 | 32 | 48 | 64 | 128 | 256 | 512 | 1024 | 2048;
  className?: string;
  alt?: string;
}

export function DiscordAvatar({
  discordId,
  avatar,
  discriminator = "0",
  size = 64,
  className = "",
  alt = "User avatar",
}: DiscordAvatarProps) {
  const avatarUrl = getDiscordAvatarUrl(discordId, avatar, size, discriminator);

  return (
    <Image
      src={avatarUrl}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      unoptimized
      priority
    />
  );
}
