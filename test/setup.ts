// import { Test, TestingModule } from '@nestjs/testing';
// import { ApplicationModule } from './../src/app.module';
// import { EventEmitter } from 'events'

// EventEmitter.defaultMaxListeners = Infinity
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

// let app: any;

// beforeAll(async () => {
//   console.log(11);
//   const moduleFixture: TestingModule = await Test.createTestingModule({
//     imports: [ApplicationModule],
//   }).compile();

//   // app = moduleFixture.createNestApplication();
//   // await app.init();
// })

// afterAll(async () => {
//   console.log(22);
// })

// // afterEach(async () => {
// //   const { collections } = mongoose.connection
// //   const promises = []
// //   Object.keys(collections).forEach((collection) => {
// //     promises.push(collections[collection].remove())
// //   })
// //   await Promise.all(promises)
// // })

// export const App: any = app;