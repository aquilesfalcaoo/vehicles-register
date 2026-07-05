import { Request, Response } from 'express';
import { VehiclesService } from '../services/VehiclesService';
import { handleError } from '../utils/handleError';

export class VehiclesController {
  private readonly vehiclesService: VehiclesService;

  constructor(vehiclesService = new VehiclesService()) {
    this.vehiclesService = vehiclesService;
  }

  public async getVehicles(_req: Request, res: Response): Promise<void> {
    try {
      const vehiclesList = await this.vehiclesService.getVehicles();
      res.status(200).json(vehiclesList);
    } catch (error) {
      handleError(res, error);
    }
  }

  public async addVehicle(req: Request, res: Response): Promise<void> {
    try {
      const newVehicle = await this.vehiclesService.addVehicle(req.body);
      res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error) {
      handleError(res, error);
    }
  }

  public async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const vehicleFounded = await this.vehiclesService.getVehicleById(id);

      if (!vehicleFounded) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.status(200).json(vehicleFounded);
    } catch (error) {
      handleError(res, error);
    }
  }

  public async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updatedVehicle = await this.vehiclesService.updateVehicle(id, req.body);

      if (!updatedVehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (error) {
      handleError(res, error);
    }
  }

  public async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const deletedVehicle = await this.vehiclesService.deleteVehicle(id);

      if (!deletedVehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
