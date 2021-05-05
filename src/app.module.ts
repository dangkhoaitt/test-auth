import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthJwtGuard } from './guard/auth-jwt.guard';
import { MongodbModule } from './mongodb/mongodb.module';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongodbModule.forRoot('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    }),
    PostgresqlModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
  ],
})
export class AppModule {}
