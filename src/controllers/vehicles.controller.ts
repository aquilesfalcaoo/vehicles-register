/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { VehiclesModel } from '../models/vehicles.model';

export class VehiclesController {
  private vehiclesModel: VehiclesModel;

  constructor () {
    this.vehiclesModel = new VehiclesModel();
  }

  public async getVehicles (req: Request, res: Response): Promise<void> {
    try {
      const vehiclesList = await this.vehiclesModel.getVehicles();
      res.status(200).json(vehiclesList);
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  public async addVehicle(req: Request, res: Response): Promise<void> {
    try {
      const newVehicle = await this.vehiclesModel.addVehicle(req.body);
      res.status(200).json({ message: "Vehicle added successfully", vehicle: newVehicle });
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  public async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const vehicleFounded = await this.vehiclesModel.getVehicleById(id);
      if (!vehicleFounded) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json(vehicleFounded);
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  public async updateVehicle (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateVehicle = await this.vehiclesModel.updateVehicle(id, req.body);
      res.status(200).json({ message: "Vehicle updated successfully", vehicle: updateVehicle });
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  public async deleteVehicle (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const deleteVehicle = await this.vehiclesModel.deleteVehicle(id);
      res.status(200).json({ message: "Vehicle deleted successfully", vehicle: deleteVehicle });
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
}
