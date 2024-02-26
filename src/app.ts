import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicles Register',
      version: '1.0.0',
      description: 'Vehicles register using Express, MongoDB and Jest',
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "My API Documentation",
    },
  ],
  apis: ['./routes/*.ts'],
};

const vehicles = [
  {
    id: 1,
    model: 'Fiat Palio'
  },
  {
    id: 2,
    model: 'Hyundai HB20'
  }
];

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Vehicles Register");
});

app.get("/vehicles", (req: Request, res: Response) => {
  res.status(200).json(vehicles);
});

export default app;
