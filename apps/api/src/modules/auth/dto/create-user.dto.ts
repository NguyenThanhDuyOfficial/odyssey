export class CreateDiscordUserDto {
  displayName: string | null = null;
  username!: string;
  discordAvatar: string | null = null;
  discordEmail?: string;
  // guilds?: any[];
  discordId!: string;
  accessToken!: string;
  refreshToken!: string;
}
