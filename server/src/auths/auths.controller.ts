import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ChangePassword,
  CodeEmailDto,
  CreateUserDto,
} from 'src/users/dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly mailerService: MailerService,
  ) {}

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authsService.login(req.user);
  }

  @Public()
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @ApiCreatedResponse({
    description: 'Người dùng được tạo thành công',
    type: User,
  })
  @Post('sign-up')
  register(@Body() registerDto: CreateUserDto) {
    return this.authsService.register(registerDto);
  }

  @Public()
  @ApiOperation({ summary: 'Kích hoạt tài khoản' })
  @ApiCreatedResponse({
    description: 'Kích hoạt thành công',
    type: CodeEmailDto,
  })
  @Post('verify-email')
  checkCode(@Body() codeEmailDto: CodeEmailDto) {
    return this.authsService.checkCode(codeEmailDto);
  }

  @Public()
  @Post('retry-code')
  @ApiOperation({ summary: 'Gửi lại mã code' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
      },
    },
  })
  retryCodeId(@Body('email') email: string) {
    return this.authsService.retryCodeId(email);
  }

  @Public()
  @ApiOperation({ summary: 'Thay đổi mật khẩu' })
  @ApiCreatedResponse({
    description: 'Kích hoạt thành công',
    type: ChangePassword,
  })
  @Patch('change-password')
  changePassword(@Body() changePassword: ChangePassword) {
    return this.authsService.changePassword(changePassword);
  }

  @Public()
  @ApiOperation({ summary: 'Quên mật khẩu' })
  @Patch('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authsService.forgotPassword(email);
  }

  @Public()
  @ApiOperation({ summary: 'Gửi email' })
  @Get('email')
  sendEmail() {
    this.mailerService.sendMail({
      to: 'vanphuongvip29@gmail.com', // list of receivers
      // from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      template: 'register',
      context: {
        name: 'VP',
        activationCode: 123456789,
      },
    });
    return 'OKi';
  }

  // @UseGuards(AuthGuard('jwt')) // Sử dụng AuthGuard với strategy 'jwt' để bảo vệ endpoint này
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  @Get('me')
  async getMe(@Request() req) {
    return { user: req.user };
  }
}
