import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../common/config/config.service';
import { ConfigModule } from '../../common/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { CreateUserSampleDto } from './user.dto'

describe('UserService', () => {
  let service: UserService;
  const config: ConfigService = new ConfigService();

  let u1 = new CreateUserSampleDto(
    'test1@test.com', 'password', '다정',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/3.png'
    ],
    'F', '1990-01-01', 'seoul', '방가 방가~~@'
  );
  let u2 = new CreateUserSampleDto(
    'test2@test.com', 'password', '운동남 조아!',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/3.png'
    ],
    'F', '1991-01-01', 'seoul', '같이 운동해욤~~~'
  );
  let u3 = new CreateUserSampleDto(
    'test3@test.com', 'password', '외로버',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/3.png'
    ],
    'F', '1994-01-01', 'seoul', ''
  );
  let u4 = new CreateUserSampleDto(
    'test4@test.com', 'password', '커피한잔할래여~',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/3.png'
    ],
    'F', '1991-01-01', 'seoul', '폴킴 너무조아 조아'
  );
  let u5 = new CreateUserSampleDto(
    'test5@test.com', 'password', '뇽',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/3.png'
    ],
    'F', '1987-01-01', 'seoul', '좋은 음악 공유해여~~'
  );

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            uri: config.uri,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
        UserModule
      ]
    })
      .compile();

    service = module.get<UserService>(UserService);
    await service.deleteSample();
  });

  it('create', async () => {
    let arr = [u1, u2, u3, u4, u5];
    let user = await service.createAll(arr);
    expect(user).toBeDefined();
  });

  // it('find all', async () => {
  //   let users = await service.findAll(null);    
  // });

  // afterAll(async () => {
  //   await getConnection()
  //     .createQueryBuilder()
  //     .delete()
  //     .from(User)
  //     // .where("id = :id", { id: 1 })
  //     .execute();
  // });
});
