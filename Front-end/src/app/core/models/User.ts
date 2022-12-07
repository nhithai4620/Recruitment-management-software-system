import { Permission } from './Permission';

export class User {
  constructor(
    public _id: number | String,
    public firstName: String,
    public lastName: String,
    public email: String,
    public phone: String,
    public dob: String,
    public permission: Permission,
    public note: String,
    public is_active: boolean
  ) {}
}
