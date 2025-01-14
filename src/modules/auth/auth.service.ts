import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.userService.findUserByLoginAndPassword(
      email.toLowerCase(),
      password,
    );

    if (!user)
      throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);

    return {
      token: this.jwtService.sign(user),
    };
  }
}
