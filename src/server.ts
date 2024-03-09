/* eslint-disable no-console */
import { VehiclesRoutes } from './routes/vehicles.routes';
import { DataBase } from './config/db.config';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../swagger.json";

export class Server {
  private app: Express;
  private port: number;
  private vehicleRoutes: VehiclesRoutes;

  constructor (port: number) {
    this.app = express();
    this.port = port;
    this.vehicleRoutes = new VehiclesRoutes();
  }

  private async setup (): Promise<void> {
    try {
      await DataBase.connect();
      console.log(`⚡️[database]: Connected to the database MongoDB`);

      this.setupSwagger();
      this.setupMiddleware();
      this.setupRoutes();
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }

  private setupSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('/', this.vehicleRoutes.getRouter());
  }

  public start (): void {
    this.setup().then(() => {
      this.app.listen(this.port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);
      });
    }).catch(error => {
      console.error('Failed to start server:', error);
    });
  }
}
