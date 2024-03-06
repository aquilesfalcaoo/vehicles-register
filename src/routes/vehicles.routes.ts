
import express, { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller";

export class VehiclesRoutes {
  private router: Router = express.Router();
  private vehiclesController: VehiclesController = new VehiclesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.vehiclesController.getVehicles.bind(this.vehiclesController));
  }

  public getRouter(): Router {
    return this.router;
  }
}