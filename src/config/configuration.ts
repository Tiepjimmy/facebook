import { registerAs } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default registerAs('config', () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },

    baseUrl: process.env.BASE_URL,
  };
});
