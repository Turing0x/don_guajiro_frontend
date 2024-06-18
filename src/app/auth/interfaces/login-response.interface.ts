import { User } from "./user.interface";

export interface LoginResponse {
  success: boolean;
  api_message: string;
  data: Data;
}

interface Data {
  user: User;
  token: string;
}
