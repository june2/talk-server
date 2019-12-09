import { Injectable } from '@nestjs/common';
import * as iap from 'in-app-purchase';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class IapService {

  constructor() {
    const config = new ConfigService();
    iap.config({
      /* Configurations for Apple */
      appleExcludeOldTransactions: true, // if you want to exclude old transaction, set this to true. Default is false
      // applePassword: 'abcdefg...', // this comes from iTunes Connect (You need this to valiate subscriptions)

      /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
      // googleServiceAccount: {
      //   clientEmail: '<client email from Google API service account JSON key file>',
      //   privateKey: '<private key string from Google API service account JSON key file>'
      // },

      /* Configurations for Google Play */
      // googlePublicKeyPath: 'path/to/public/key/directory/', // this is the path to the directory containing iap-sanbox/iap-live files
      // googlePublicKeyStrSandBox: 'publicKeySandboxString', // this is the google iap-sandbox public key string
      // googlePublicKeyStrLive: 'publicKeyLiveString', // this is the google iap-live public key string
      // googleAccToken: 'abcdef...', // optional, for Google Play subscriptions
      // googleRefToken: 'dddd...', // optional, for Google Play subscritions
      // googleClientID: 'aaaa', // optional, for Google Play subscriptions     
      // googleClientSecret: 'bbbb', // optional, for Google Play subscriptions

      /* Configurations all platforms */
      test: config.env === 'production' ? false : true, // For Apple and Googl Play to force Sandbox validation only
      verbose: config.env === 'production' ? false : true // Output debug logs to stdout stream
    });
  }

  async processPurchase(receipt) {
    try {
      await iap.setup();
      const validationResponse = await iap.validate(receipt);
      return validationResponse;
    } catch (err) {
      throw new InternalServerErrorException(`Process Purchase error: ${err}`);
    }
  }

}
