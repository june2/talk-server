import { Injectable, NestMiddleware } from '@nestjs/common';
import Expo from 'expo-server-sdk';

@Injectable()
export class PushService {
  private readonly expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  send(pushToken = 'ExponentPushToken[D6tnZPGvJ9R1Yt70dt7OXQ]') {
    if (Expo.isExpoPushToken(pushToken)) {
      let messages = [];
      messages.push({
        to: pushToken,
        sound: 'default',
        title: 'title',
        body: 'This is a test notification',
        data: { type: 'room' },
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
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }
  }
}
