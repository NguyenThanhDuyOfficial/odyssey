export class CreateDiscordUserDto {
  displayName!: string | null;
  username!: string;
  discordAvatar!: string | null;
  discordEmail?: string;
  // guilds?: any[];
  discordId!: string;
  accessToken!: string;
  refreshToken!: string;
}
