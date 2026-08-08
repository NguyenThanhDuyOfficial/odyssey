import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy, { Profile } from 'passport-discord';
import { AuthService } from '../auth.service.js';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    console.log(configService.get('DISCORD_CLIENT_ID'));
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email'],
      passReqToCallback: true,
    } as any);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, avatar, email, id, displayName } = profile;
    const user = await this.authService.validateDiscordUser({
      username: username,
      discordAvatar: avatar,
      discordEmail: email,
      discordId: id,
      displayName: displayName,
      accessToken,
      refreshToken,
    });
    return user;
  }
}
