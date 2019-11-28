import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
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
        wait: ((Math.floor(Math.random() * 100) + 1) * 10), // 10 ~ 1000 second
        user: user,
        to: to,
        text: text,
        room: room
      }
      const params = {
        stateMachineArn: 'arn:aws:iam::308674859491:role/service-role/stepfunction',
        input: JSON.stringify(input)
      };
      this.sf.startExecution(params)
    } catch (err) {
      console.error(`sf: ${err}`);
    }
  }

}
