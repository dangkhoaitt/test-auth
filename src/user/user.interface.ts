import { Base } from 'src/base/base.interface';

export interface User extends Base {
  username?: string;
  password?: string;
  role?: Roles;
  name?: string;
}

export enum Roles {
  LEADER = 1,
  ADMIN = 2,
  MEMBER = 3,
}
