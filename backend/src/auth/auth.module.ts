import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
 import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
    ,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: '1d'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
