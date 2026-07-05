import { Router, Request, Response } from 'express';
import { VehiclesController } from '../controllers/VehiclesController';

export class VehiclesRoutes {
  private readonly router: Router;
  private readonly vehiclesController: VehiclesController;

  constructor(vehiclesController = new VehiclesController()) {
    this.router = Router();
    this.vehiclesController = vehiclesController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', (_req: Request, res: Response) => {
      res.redirect('/api-docs');
    });

    this.router
      .route('/vehicles')
      .get(this.vehiclesController.getVehicles.bind(this.vehiclesController))
      .post(this.vehiclesController.addVehicle.bind(this.vehiclesController));

    this.router
      .route('/vehicles/:id')
      .get(this.vehiclesController.getVehicleById.bind(this.vehiclesController))
      .put(this.vehiclesController.updateVehicle.bind(this.vehiclesController))
      .delete(this.vehiclesController.deleteVehicle.bind(this.vehiclesController));
  }

  public getRouter(): Router {
    return this.router;
  }
}
