import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { USER_STATUS } from './constants/user-status.constants';
import { LoginDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto, response: Response) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (password != user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // if (user.status !== USER_STATUS.ACTIVE) {
    //   throw new UnauthorizedException('User account is not active');
    // }

    const { accessToken, refreshToken } = this.generateTokens({
      email: user.email,
      role: user.role,
    });

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // await this.prisma.user.update({
    //   where: { id: user.id },
    //   data: { lastLoginAt: new Date() },
    // });

    return {
      // status: 'success',
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        role: user.role
      },
    };
  }

  async refreshToken(request: Request) {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const config = this.configService.get('config');
      const payload = this.jwtService.verify(refreshToken, {
        secret: config?.jwt?.secret,
      }) as { id: number; type?: string };

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('User account is not active');
      }

      const { accessToken, refreshToken: nextRefreshToken } = this.generateTokens({
        email: user?.email,
        role: user?.role,
      });

      return {
        accessToken,
        refreshToken: nextRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(response: Response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Logout successful' };
  }

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User account is not active');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async validateUser(id: number, email: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user && user.email === email) {
      return user;
    }

    return null;
  }

  private generateTokens(user: {
    email: string;
    role: string;
  }) {
    const config = this.configService.get('config');

    const accessToken = this.jwtService.sign({
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        role: user.role,
        type: 'refresh',
      },
      {
        expiresIn: config?.jwt?.refreshExpiresIn || '7d',
      },
    );

    return { accessToken, refreshToken };
  }
}
