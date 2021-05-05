import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/auth-jwt.strategy';
import { CollectionList } from 'src/mongodb/collection.enum';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SendMailService } from './send-mail.service';
import { SendSMSService } from './send-sms.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '2',
      signOptions: { expiresIn: '10s' },
    }),
    MongodbModule.useCollection(CollectionList.USER),
  ],
  controllers: [AuthController],
  providers: [AuthService, SendMailService, SendSMSService, JwtStrategy],
})
export class AuthModule {}
