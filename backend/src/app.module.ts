import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
 import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/taskdb', { useNewUrlParser: true }),
    TaskModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true,})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
