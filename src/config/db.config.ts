/* eslint-disable no-useless-catch */
import mongoose from 'mongoose';

export class DataBase {
  static async connect(): Promise<mongoose.Connection> {
    try {
      await mongoose.connect('mongodb+srv://admin:admin@cluster.3sdcndl.mongodb.net/vehicles?retryWrites=true&w=majority');
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }
}
