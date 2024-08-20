import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { User as UserDto } from '../../entities/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUserLimit(@User() user: UserDto) {
    return await this.userService.getUserLimit(user.id);
  }
}
