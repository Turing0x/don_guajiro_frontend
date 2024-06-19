export interface LoginResponse {
  success: boolean;
  api_message: string;
  data: Data;
}

interface Data {
  username: string;
  userID: string;
  role: string;
  token: string;
}
