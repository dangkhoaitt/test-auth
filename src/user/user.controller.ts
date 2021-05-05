import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async insert(@Body() body): Promise<User> {
    return this.userService.insert(body);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getDetail(@Param() { id }): Promise<User> {
    return this.userService.getDetail(id);
  }

  @Patch(':id')
  async edit(@Param() { id }, @Body() body) {
    return this.userService.edit(id, body);
  }
}
