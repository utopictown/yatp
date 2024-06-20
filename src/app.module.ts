import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from './profiles/profile.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:123456@localhost/yatp?authSource=admin'), 
    ProfilesModule, AuthModule, UsersModule, InterestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
