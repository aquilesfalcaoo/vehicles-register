/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { VehiclesModel } from '../models/vehicles.model';

export class VehiclesController {
  private vehiclesModel: VehiclesModel;

  constructor () {
    this.vehiclesModel = new VehiclesModel();
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
  public async getVehicles (req: Request, res: Response): Promise<void> {
    try {
      const vehiclesList = await this.vehiclesModel.getVehicles();
      res.status(200).json(vehiclesList);
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  /**
 * @swagger
 * /vehicles:
 *  post:
 *    summary: Endpoint for add a new vehicle data.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              model:
 *                type: string
 *              vehicleModel:
 *                type: string
 *              isZeroKm:
 *                type: boolean
 *              color:
 *                type: string
 *              renavam:
 *                type: string
 *    responses:
 *      '200':
 *        description: Vehicle added successfully.
 */
  public async addVehicle(req: Request, res: Response): Promise<void> {
    try {
      const newVehicle = await this.vehiclesModel.addVehicle(req.body);
      res.status(200).json({ message: "Vehicle added successfully", vehicle: newVehicle });
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  /**
 * @swagger
 * /vehicles/id:
 *  get:
 *    summary: Endpoint for obtaining a vehicle data by id.
 *    responses:
 *      '200':
 *        description: Vehicle successfully returned.
 */
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

  /**
 * @swagger
 * /vehicles/id:
 *  put:
 *    summary: Endpoint for update a vehicle data.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              model:
 *                type: string
 *              vehicleModel:
 *                type: string
 *              isZeroKm:
 *                type: boolean
 *              color:
 *                type: string
 *              renavam:
 *                type: string
 *    responses:
 *      '200':
 *        description: Vehicle updated with successfully.
 */
  public async updateVehicle (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const updateVehicle = await this.vehiclesModel.updateVehicle(id, req.body);
      res.status(200).json({ message: "Vehicle updated successfully", vehicle: updateVehicle });
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }

  /**
 * @swagger
 * /vehicles/id:
 *  delete:
 *    summary: Endpoint for delete a vehicle data.
 *    responses:
 *      '200':
 *        description: Vehicle removed with successfully.
 */
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
