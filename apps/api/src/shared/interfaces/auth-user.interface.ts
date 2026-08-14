import { Role } from 'src/generated/prisma/enums';

export interface AuthUser {
  id: string;
  username: string;
  displayName?: string;
  role: Role;
  discordAvatar?: string;
}
