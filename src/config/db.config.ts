import mongoose from "mongoose";

export class DataBase {
  static async connect() {
    try {
      await mongoose.connect("mongodb+srv://admin:admin@cluster.3sdcndl.mongodb.net/vehicles?retryWrites=true&w=majority");
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }
}

