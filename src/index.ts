/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import 'dotenv/config';
import { VehiclesRoutes } from './routes/VehiclesRoutes';
import { Database } from './config/db.config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();
const port = 3000;
const vehicleRoutes = new VehiclesRoutes();

async function setup(): Promise<void> {
  try {
    await Database.connect();
    console.log(`⚡️[database]: Connected to the database MongoDB`);

    setupSwagger();
    setupMiddleware();
    setupRoutes();
  } catch (error: any) {
    console.error(`❌[database]: Error connecting to the database: `, error.message);
    throw error;
  }
}

function setupSwagger(): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

function setupMiddleware(): void {
  app.use(express.json());
}

function setupRoutes(): void {
  app.use('/', vehicleRoutes.getRouter());
}

function start(): void {
  setup()
    .then(() => {
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
      });
    })
    .catch((error) => {
      console.error(`❌[server]: Failed to start server: `, error.message);
    });
}

start();
