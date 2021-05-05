import { Module } from '@nestjs/common';
import { CollectionList } from 'src/mongodb/collection.enum';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongodbModule.useCollection(CollectionList.USER)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
