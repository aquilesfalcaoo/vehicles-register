import { VehiclesModel, Vehicle } from '../models/Vehicles';

export class VehiclesService {
  async getVehicles(): Promise<Vehicle[]> {
    return VehiclesModel.find({}).lean();
  }

  async addVehicle(data: Vehicle): Promise<Vehicle> {
    const newVehicle = await VehiclesModel.create(data);
    return newVehicle.toObject() as Vehicle;
  }

  async getVehicleById(id: string): Promise<Vehicle | null> {
    if (!id) return null;

    const vehicle = await VehiclesModel.findById(id).lean();
    return vehicle as Vehicle | null;
  }

  async updateVehicle(id: string, data: Vehicle): Promise<Vehicle | null> {
    if (!id) return null;

    const updatedVehicle = await VehiclesModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    return updatedVehicle as Vehicle | null;
  }

  async deleteVehicle(id: string): Promise<boolean> {
    if (!id) return false;

    const deletedVehicle = await VehiclesModel.findByIdAndDelete(id);
    return Boolean(deletedVehicle);
  }
}
