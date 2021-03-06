import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../common/config/config.service';
import { ConfigModule } from '../../common/config/config.module';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose'
import { User } from './user.interface';;
import { UserSchema } from './user.schema';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { CreateUserSampleDto } from './user.dto';
// const datalk = require('./../../../test/sample.json');
// const datalk = require('./../../../test/sample2.json');
const datalk = require('./../../../test/sample2.json');

describe('UserService', () => {
  let service: UserService;
  let repo: Model<User>;
  const config: ConfigService = new ConfigService();

  let u1 = new CreateUserSampleDto(
    'test1@test.com', 'password', '다정',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/1/3.png'
    ],
    'F', '1990-01-01', 'KR', 'seoul', '방가 방가~~@'
  );
  let u2 = new CreateUserSampleDto(
    'test2@test.com', 'password', '운동남 조아!',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/2/3.png'
    ],
    'F', '1991-01-01', 'KR', 'seoul', '같이 운동해욤~~~'
  );
  let u3 = new CreateUserSampleDto(
    'test3@test.com', 'password', '외로버',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/3/3.png'
    ],
    'F', '1994-01-01', 'KR', 'seoul', ''
  );
  let u4 = new CreateUserSampleDto(
    'test4@test.com', 'password', '커피한잔할래여~',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/4/3.png'
    ],
    'F', '1991-01-01', 'KR', 'seoul', '폴킴 너무조아 조아'
  );
  let u5 = new CreateUserSampleDto(
    'test5@test.com', 'password', '뇽',
    [
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/1.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/2.png',
      'https://talkx3.s3.ap-northeast-2.amazonaws.com/sample/5/3.png'
    ],
    'F', '1987-01-01', 'KR', 'seoul', '좋은 음악 공유해여~~'
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
    repo = service.userRepo;
    // await service.deleteSample('WAITING');
  });

  // it('create SAMPLE', async () => {
  //   let arr = [u1, u2, u3, u4, u5];
  //   let user = await service.createAll(arr);
  //   expect(user).toBeDefined();
  // });

  // it('create DATALK', async () => {
  //   let arr = [];
  //   let members = datalk.lobby.member;
  //   const promises = members.map(async el => {
  //     let user = (await service.findOne({ email: `${el.idx}@test.com` }));
  //     // console.log(user);
  //     if (null == user) {
  //       let images = [];
  //       if (el.photo) {
  //         el.photo.forEach(im => {
  //           images.push(im.medium);
  //         })
  //       }
  //       let location = (el.area) ? el.area.trim().toLowerCase() : 'seoul';
  //       let gender = (el.gender == 'male') ? 'M' : 'F';
  //       let birthday = `${2019 - el.age}-01-01`;
  //       arr.push(new CreateUserSampleDto(
  //         `${el.idx}@test.com`, 'password', el.nickname, images,
  //         gender, birthday, 'KR', location, el.about, 'DATALK'
  //       ));
  //     }
  //   });
  //   // wait until all promises are resolved
  //   await Promise.all(promises);
  //   console.log(arr.length)
  //   await service.createAll(arr);
  // });

  it('delete Image null', async () => {
    let users = await repo.find({
      isActive: true,
      state: { $ne: 'ADMIN' },
      images: { $exists: true, $eq: [] }
    });
    let ids = users.map(user => user._id);
    let res = await repo.deleteMany({ _id: { $in: ids } });
    console.log(res);
  });


  // it('find all', async () => {
  //   let users = await service.findAll(null);    
  //   console.log(users);
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
