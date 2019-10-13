export interface User {
  readonly Id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly email: string;
  readonly emailConfirmed: boolean;
  readonly phoneNumber: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly passwordHash: string;
  readonly lockOutEnabled: boolean;
  readonly lockoutEndtDate: Date;
  readonly accesFailedCount: number;
}
