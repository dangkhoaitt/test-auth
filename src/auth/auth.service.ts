import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcryptjs';
import { Collection, ObjectId } from 'mongodb';
import { CollectionList } from 'src/mongodb/collection.enum';
import { User } from 'src/user/user.interface';
import { ChangePasswordDto } from './dto/chage-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CollectionList.USER) private userCollection: Collection<User>,
    private jwtService: JwtService,
  ) {}

  async checkLogin(authUser: LoginDto) {
    const user = await this.userCollection.findOne({
      username: authUser.username,
    });

    if (user && compareSync(authUser.password, user.password)) {
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
      };
      return {
        id: user._id,
        username: user.username,
        name: user.name,
        access_token: this.jwtService.sign(payload),
        refresh_token: authUser.remember
          ? this.jwtService.sign(payload, { expiresIn: '1800s' })
          : undefined,
      };
    }

    throw new HttpException('', HttpStatus.BAD_REQUEST);
  }

  async changePassword(id: string, body: ChangePasswordDto): Promise<boolean> {
    const currentPassword = await (
      await this.userCollection.findOne({ _id: new ObjectId(id) })
    ).password;
    if (compareSync(body.oldPassword, currentPassword)) {
      const { modifiedCount } = await this.userCollection.updateOne(
        { _id: new ObjectId(id) },
        { password: hashSync(body.newPassword) },
      );
      return modifiedCount > 0;
    }

    throw new HttpException(
      'Mật khẩu hiện tại không đúng!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
