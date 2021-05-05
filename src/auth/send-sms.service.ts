import { Injectable } from '@nestjs/common';

@Injectable()
export class SendSMSService {
  async send() {
    const Vonage = require('@vonage/server-sdk');
    const vonage = new Vonage({
      apiKey: '2369a8b2',
      apiSecret: 'aeHU5V4nqCaMOI1g',
    });
    const from = 'Vonage APIs';
    const to = '+84905499422';
    const text = 'gửi sms chơi';
    console.log('vonage :>> ', vonage);
    await vonage.message.sendSms(
      from,
      to,
      text,
      { from, to, text },
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === '0') {
            console.log('Message sent successfully.');
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]['error-text']}`,
            );
          }
        }
      },
    );
  }
}
