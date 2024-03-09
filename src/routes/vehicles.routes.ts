import { VehiclesController } from '../controllers/vehicles.controller';
import express, { Router, Request, Response } from 'express';

export class VehiclesRoutes {
  private router: Router = express.Router();
  private vehiclesController: VehiclesController = new VehiclesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', (req: Request, res: Response) => {
      res.redirect('/api-docs');
    });

    this.router.get('/vehicles', this.vehiclesController.getVehicles.bind(this.vehiclesController));
    this.router.post('/vehicles', this.vehiclesController.addVehicle.bind(this.vehiclesController));
    this.router.get('/vehicles/:id', this.vehiclesController.getVehicleById.bind(this.vehiclesController));
    this.router.put('/vehicles/:id', this.vehiclesController.updateVehicle.bind(this.vehiclesController));
    this.router.delete('/vehicles/:id', this.vehiclesController.deleteVehicle.bind(this.vehiclesController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
