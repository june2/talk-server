import { Injectable, NestMiddleware } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { User } from './../../api/user/user.interface';
import { NotificationService } from './../../api/notification/notification.service';
import { CreateNotificationDto } from './../../api/notification/notification.dto';

@Injectable()
export class PushService {
  private readonly expo: Expo;

  constructor(private readonly notificationService: NotificationService) {
    this.expo = new Expo();
  }

  send(from: User, to: User, body: string, lastMsg: string, roomId: string, type: string) {
    if (Expo.isExpoPushToken(to.pushToken)) {
      let messages = [];
      messages.push({
        to: to.pushToken,
        sound: 'default',
        title: from.name,
        body: body,
        data: {
          type: type,
          roomId: roomId,
          userId: from.id,
          userName: from.name,
          userImage: (from.images.length > 0) ? from.images[0] : '',
          msg: lastMsg
        },
      })

      let chunks = this.expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
          try {
            let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            this.notificationService.create(new CreateNotificationDto(roomId, to.id, lastMsg));
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }
  }
}
