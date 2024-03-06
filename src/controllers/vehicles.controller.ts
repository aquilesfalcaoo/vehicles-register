import { Request, Response } from 'express';
import { VehiclesModel } from '../models/vehicles.model';


export class VehiclesController {
  private vehicleModel: VehiclesModel;

  constructor() {
    this.vehicleModel = new VehiclesModel();
  }

  /**
   * @swagger
   * /vehicles:
   *  get:
   *    summary: Endpoint for obtaining vehicles data.
   *    responses:
   *      '200':
   *        description: Vehicles successfully returned.
   */
  public async getVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehiclesList = await this.vehicleModel.getVehicles();
      res.status(200).json(vehiclesList);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}