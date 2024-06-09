export enum RolesUsers {
  admin         = 'admin',
  guest         = 'guest',
  commodity     = 'commodity',
  seller        = 'seller',
}


export interface UserRole {
  admin: string;
  guest: string;
  seller: string;
  commodity: string;
}
