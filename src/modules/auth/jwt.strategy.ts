import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { User } from '../../entities/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'AppJwt') {
  constructor(
    private moduleRef: ModuleRef,
    private readonly configService: ConfigService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(request: Request, payload: User): Promise<User> {
    if (!payload)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    return payload;
  }
}
