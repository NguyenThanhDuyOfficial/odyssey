import { Inject, Injectable } from '@nestjs/common';
import { CreateDiscordUserDto } from './dto/create-user.dto.js';
import { User } from 'src/generated/prisma/client.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateDiscordUser(discordUser: CreateDiscordUserDto): Promise<User> {
    let user = await this.userService.findOne({
      discordId: discordUser.discordId,
    });
    if (!user) {
      user = await this.userService.createUser({
        ...discordUser,
      });
    } else {
      user.accessToken = discordUser.accessToken;
      user.refreshToken = discordUser.refreshToken;
      user.username = discordUser.username;
      user.discordAvatar = discordUser.discordAvatar;
      await this.userService.updateUser(user.id, user);
    }
    return user;
  }
}
