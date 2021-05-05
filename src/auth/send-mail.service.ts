import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AUTH } from './auth.interface';

@Injectable()
export class SendMailService {
  async sendMail() {
    const tesAccount = await nodemailer.createTestAccount();
    console.log('tesAccount.user :>> ', tesAccount.user);
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'khoavoit@gmail.com', // generated ethereal user
        pass: AUTH, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"khoavoit đây 👻" <khoavoit@gmail.com>', // sender address
      to: 'dangkhoaitt@gmail.com, khoawin123@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Test gửi mail xem chơi?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
