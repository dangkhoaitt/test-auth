import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IdDto } from 'src/base/dto/id.dto';
import { Public } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/chage-password.dto';
import { LoginDto } from './dto/login.dto';
import { SendMailService } from './send-mail.service';
import { SendSMSService } from './send-sms.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sendMainService: SendMailService,
    private sendSmsService: SendSMSService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() authUser: LoginDto) {
    return this.authService.checkLogin(authUser);
  }

  @Patch('change-password/:id')
  changePassword(@Param() { id }: IdDto, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(id, body);
  }

  @Public()
  @Get('forgot-password')
  async forgotPassword(): Promise<void> {
    Promise.all([this.sendMainService.sendMail(), this.sendSmsService.send()]);
  }
}
