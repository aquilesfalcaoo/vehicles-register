import mongoose from 'mongoose';

export class Database {
  private static readonly connectionString = process.env.DB_CONNECTION_STRING;

  static async connect(): Promise<mongoose.Connection> {
    if (!this.connectionString) {
      throw new Error('DB_CONNECTION_STRING is not defined');
    }

    try {
      await mongoose.connect(this.connectionString, {
        serverSelectionTimeoutMS: 5000,
      });

      return mongoose.connection;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown database connection error';
      throw new Error(`Failed to connect to database: ${message}`);
    }
  }

  static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
