export interface User {
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly email: string;
  readonly emailConfirmed: boolean;
  readonly phoneNumber: string;
  readonly lockOutEnabled: boolean;
  readonly lockoutEndtDate: Date;
  readonly accesFailedCount: number;
}
