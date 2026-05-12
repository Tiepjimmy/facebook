export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    role: string;
  };

  constructor(accessToken: string, refreshToken: string, user: any) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = {
      email: user.username,
      role: user.roleCode,
    };
  }
}
