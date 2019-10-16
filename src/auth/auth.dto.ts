export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
