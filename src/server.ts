/* eslint-disable no-console */
import express, { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { VehiclesRoutes } from './routes/vehicles.routes';
import { DataBase } from './config/db.config';

export class Server {
  private app: Express;
  private port: number;
  private vehicleRoutes: VehiclesRoutes;

  constructor (port: number) {
    this.app = express();
    this.port = port;
    this.vehicleRoutes = new VehiclesRoutes();
  }

  private getSwaggerOptions (): swaggerJSDoc.Options {
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Vehicles Register',
          version: '1.0.0',
          description: 'Vehicles register using Express.js, MongoDB and Jest',
          license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html'
          },
          contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com'
          }
        },
        servers: [
          {
            url: 'http://localhost:3000',
            description: 'Development server'
          }
        ]
      },
      apis: ['./src/controllers/*.ts']
    };

    return options;
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
    const swaggerOptions = this.getSwaggerOptions();
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
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
