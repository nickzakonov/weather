import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return await this.authService.authenticate(email, password);
  }
}
