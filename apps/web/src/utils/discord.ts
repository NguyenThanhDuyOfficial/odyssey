export function getDiscordAvatarUrl(
  discordId: string,
  avatar: string | null,
  size: number = 256,
  discriminator: string = "0",
): string {
  if (!avatar) {
    const index = parseInt(discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }
  const format = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${format}?size=${size}`;
}
