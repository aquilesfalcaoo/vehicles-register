/* eslint-disable no-useless-catch */
import mongoose from 'mongoose';

export class Database {
  static async connect(): Promise<mongoose.Connection> {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }
}
