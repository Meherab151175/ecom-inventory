import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, username: dto.username, password: hash },
    });
    return this.getTokens(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new ForbiddenException('Invalid credentials');
    return this.getTokens(user.id, user.email);
  }

  async getTokens(userId: number, email: string) {
    const at = await this.jwt.signAsync(
      { sub: userId, email },
      { secret: process.env.JWT_SECRET || 'secret', expiresIn: '15m' },
    );
    const rt = await this.jwt.signAsync(
      { sub: userId, email },
      { secret: process.env.JWT_RT_SECRET || 'refreshsecret', expiresIn: '7d' },
    );
    return { access_token: at, refresh_token: rt };
  }
}
