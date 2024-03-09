/* eslint-disable no-useless-catch */
import mongoose, { Schema, Model } from 'mongoose';

interface VehiclesProps {
  model: string;
  isZeroKm: boolean;
  licensePlate: string;
  color: string;
  renavam: string;
}

export class VehiclesModel {
  private vehicleModel: Model<VehiclesProps>;

  constructor () {
    const vehicleSchema: Schema<VehiclesProps> = new Schema({
      model: { type: String, required: true },
      isZeroKm: { type: Boolean, required: true },
      licensePlate: { type: String, required: true },
      color: { type: String, required: true },
      renavam: { type: String, required: true }
    }, { versionKey: false });

    this.vehicleModel = mongoose.model<VehiclesProps>('vehicles', vehicleSchema);
  }

  async getVehicles(): Promise<VehiclesProps[]> {
    try {
      const vehiclesList = await this.vehicleModel.find({});
      return vehiclesList;
    } catch (error) {
      throw error;
    }
  }

  async addVehicle(data: VehiclesProps): Promise<VehiclesProps> {
    try {
      const newVehicle = await this.vehicleModel.create(data);
      return newVehicle.toObject();
    } catch (error) {
      throw error;
    }
  }

  async getVehicleById(id: string): Promise<VehiclesProps | null> {
    try {
      const vehicleFounded = await this.vehicleModel.findById(id);
      return vehicleFounded;
    } catch (error) {
      throw error;
    }
  }

  async updateVehicle(id: string, data: VehiclesProps): Promise<void> {
    try {
      await this.vehicleModel.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteVehicle (id: string): Promise<void> {
    try {
      await this.vehicleModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
