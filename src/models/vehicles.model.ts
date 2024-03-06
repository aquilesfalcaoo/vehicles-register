import mongoose, { Document, Schema, Model } from "mongoose";

interface IVehicle extends Document {
  id?: string;
  vehicleModel: string;
  isZeroKm: boolean;
  licensePlate: string;
  color: string;
  renavam: string;
}

export class VehiclesModel {
  private vehicleModel: Model<IVehicle>;

  constructor() {
    const vehicleSchema: Schema<IVehicle> = new Schema({
      id: { type: mongoose.Schema.Types.ObjectId },
      vehicleModel: { type: String, required: true },
      isZeroKm: { type: Boolean, required: true },
      licensePlate: { type: String, required: true },
      color: { type: String, required: true },
      renavam: { type: String, required: true },
    }, { versionKey: false });

    this.vehicleModel = mongoose.model<IVehicle>("vehicles", vehicleSchema);
  }

  async getVehicles(): Promise<IVehicle[]> {
    try {
      const vehiclesList = await this.vehicleModel.find({});
      return vehiclesList;
    } catch (error) {
      throw error;
    }
  }
}