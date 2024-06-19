import { User } from './user.interface'

export interface CheckTokenResponse {
  success: boolean;
  api_message: string;
  data: Data;
}

export interface Data {
  user: User;
  token: string;
}

