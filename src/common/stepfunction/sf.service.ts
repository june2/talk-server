import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { getContent } from '../corpus/data';
import { User } from './../../api/user/user.interface';
import * as AWS from 'aws-sdk';

@Injectable()
export class SfService {
  private readonly sf: AWS.StepFunctions;

  constructor() {
    const config = new ConfigService();
    AWS.config.update({
      region: config.bucketRegion,
      accessKeyId: config.bucketId,
      secretAccessKey: config.bucketKey,
    });
    this.sf = new AWS.StepFunctions();
  }

  excute(user: User, to: User, text: string, room: string) {
    try {
      const input = {
        wait: ((Math.floor(Math.random() * 50) + 1) * 10), // 10 ~ 1000 second
        user: to.id, // send
        to: user.id, // receive
        text: getContent(),
        room: room
      }
      const params = {
        stateMachineArn: 'arn:aws:states:ap-northeast-2:308674859491:stateMachine:message_queue',
        input: JSON.stringify(input)
      };
      this.sf.startExecution(params, (err, data) => {
        if (err) throw new InternalServerErrorException(`sf servie: ${err}, ${data}`);
        else console.log('Sf servie : ', data);
      });
    } catch (err) {
      throw new InternalServerErrorException(`sf: ${err}`);
    }
  }

}
