export type TUserRecord = 'local' | 'LDAP';

export interface IUser {
  id: number,
  tags: string[];
  recordType: TUserRecord;
  login: string;
  password: string;
}
