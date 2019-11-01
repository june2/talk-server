import { Injectable, NestMiddleware } from '@nestjs/common';
import * as FCM from 'fcm-node';
import { User } from './../../api/user/user.interface';
import { NotificationService } from './../../api/notification/notification.service';
import { CreateNotificationDto } from './../../api/notification/notification.dto';

@Injectable()
export class PushService {
  private readonly fcm: FCM;

  constructor(private readonly notificationService: NotificationService) {
    this.fcm = new FCM();
  }

  send(from: User, to: User, body: string, lastMsg: string, roomId: string, type: string) {
    let message = {
      to: to.pushToken,
      // collapse_key: 'your_collapse_key',
      notification: {
        title: from.name,
        body: body
      },
      data: {
        type: type,
        roomId: roomId,
        userId: from.id,
        userName: from.name,
        userImage: (from.images.length > 0) ? from.images[0] : '',
        msg: lastMsg
      },
    }
    this.fcm.send(message, function (err, response) {
      if (err) {
        console.error(`push: ${err}`);
      } else {
        console.log(response);
        this.notificationService.create(new CreateNotificationDto(roomId, to.id, lastMsg));
      }
    });
  }
}
