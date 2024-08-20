import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, Auth } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User, @RawHeaders() header: any) {
    return {
      ok: true,
      message: 'Prueba exitosa'
    };
  }

  @Get('/private')
  @RoleProtected()
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: User, @RawHeaders() header: any) {
    return {
      ok: true,
      message: 'Prueba exitosa'
    };
  }

  @Get('/private') 
  @Auth()
  testingPrivateRoute3() {
    return {
      ok: true,
      message: 'Prueba exitosa'
    };
  }

}
