import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord';
import { AuthService } from '../auth.service.js';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email'],
    } as any);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('Profile', profile);
    const { username, avatar, email, id, global_name } = profile;
    const user = await this.authService.validateDiscordUser({
      username: username,
      discordAvatar: avatar,
      discordEmail: email,
      discordId: id,
      displayName: global_name,
      accessToken,
      refreshToken,
    });
    return user;
  }
}
