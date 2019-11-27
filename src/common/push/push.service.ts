import { Injectable, NestMiddleware } from '@nestjs/common';
import * as FCM from 'fcm-node';
import { ConfigService } from './../config/config.service';
import { User } from './../../api/user/user.interface';

@Injectable()
export class PushService {
  private readonly fcm: FCM;

  constructor() {
    const config = new ConfigService();
    this.fcm = new FCM(config.fcmKey);
  }

  send(from: User, to: User, body: string, lastMsg: string, roomId: string, type: string, image: string = null) {
    let message = {
      to: to.pushToken,
      // collapse_key: 'your_collapse_key',
      notification: {
        title: from.name,
        body: body,
        sound: 'default'
      },
      data: {
        type: type,
        roomId: roomId,
        userId: from.id,
        userName: from.name,
        userImage: (from.images.length > 0) ? from.images[0] : '',
        msg: lastMsg,
        image: image
      },
    }
    this.fcm.send(message, function (err, response) {
      if (err) {
        console.error(`push: ${err}`);
      } else {
        console.log(response);
      }
    });
  }
}
