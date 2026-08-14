import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}
