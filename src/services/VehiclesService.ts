import { VehiclesModel, VehiclesProps } from '../models/Vehicles';

export class VehiclesService {
  async getVehicles(): Promise<VehiclesProps[]> {
    const vehiclesList = await VehiclesModel.find({});
    return vehiclesList;
  }

  async addVehicle(data: VehiclesProps): Promise<VehiclesProps> {
    const newVehicle = await VehiclesModel.create(data);
    return newVehicle.toObject();
  }

  async getVehicleById(id: string): Promise<VehiclesProps | null> {
    const vehicleFounded = await VehiclesModel.findById(id);
    return vehicleFounded;
  }

  async updateVehicle(id: string, data: VehiclesProps): Promise<void> {
    await VehiclesModel.findByIdAndUpdate(id, data);
  }

  async deleteVehicle(id: string): Promise<void> {
    await VehiclesModel.findByIdAndDelete(id);
  }
}
