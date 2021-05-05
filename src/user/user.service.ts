import { Inject, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { Collection, ObjectId } from 'mongodb';
import { CollectionList } from 'src/mongodb/collection.enum';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private DEFAULT_PASSWORD = '123';

  constructor(
    @Inject(CollectionList.USER) private collection: Collection<User>,
  ) {}

  async insert(body): Promise<User> {
    const password = hashSync(this.DEFAULT_PASSWORD);
    const insert = await this.collection.insertOne({ ...body, password });
    return insert.ops[0];
  }

  async getAll(): Promise<User[]> {
    return this.collection.find().toArray();
  }

  async getDetail(id: string): Promise<User> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async edit(id: string, body) {
    const { value } = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      body,
    );
    return value;
  }
}
