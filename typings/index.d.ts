import { MongooseModels } from 'egg';
declare module 'egg' {
interface IModel extends MongooseModels {}
  // extend app
  interface Application {
    model: IModel;
  }
  // extend context
  interface Context {
    model: IModel;
  }
}