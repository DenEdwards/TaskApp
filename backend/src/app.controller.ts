import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
 import { AuthService } from './auth/auth.service';
 import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //Post /login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any{
    return this.authService.login(req.user);
  }
 
}
