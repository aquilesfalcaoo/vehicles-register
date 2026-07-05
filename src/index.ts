/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import express, { NextFunction, Request, Response, Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { VehiclesRoutes } from './routes/VehiclesRoutes';
import { Database } from './config/db.config';
import { Server as HttpServer, IncomingMessage, ServerResponse } from 'http';

export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/', new VehiclesRoutes().getRouter());

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  });

  return app;
}

export async function startServer(): Promise<HttpServer<typeof IncomingMessage, typeof ServerResponse>> {
  await Database.connect();

  const app = createApp();
  const port = Number(process.env.PORT) || 3000;

  const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}

if (require.main === module) {
  startServer().catch((error: unknown) => {
    console.error('❌[server]: Failed to start server:', error);
  });
}
