import { Router } from 'express';
import { VehiclesController } from '../../controllers/VehiclesController';
import { VehiclesRoutes } from '../../routes/VehiclesRoutes';

describe('VehiclesRoutes', () => {
  it('creates a router and registers the expected routes', () => {
    const controller = {
      getVehicles: jest.fn(),
      addVehicle: jest.fn(),
      getVehicleById: jest.fn(),
      updateVehicle: jest.fn(),
      deleteVehicle: jest.fn(),
    } as unknown as VehiclesController;
    const routes = new VehiclesRoutes(controller);
    const router = routes.getRouter() as Router & { stack: Array<{ route?: { path?: string; methods?: Record<string, boolean> } }> };

    const registeredPaths = (router.stack as Array<{ route?: { path?: string; methods?: Record<string, boolean> } }>)
      .filter((layer) => Boolean(layer.route))
      .map((layer) => ({ path: layer.route?.path, methods: layer.route?.methods }));

    expect(registeredPaths).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/vehicles', methods: expect.objectContaining({ get: true, post: true }) }),
        expect.objectContaining({ path: '/vehicles/:id', methods: expect.objectContaining({ get: true, put: true, delete: true }) }),
      ]),
    );
  });
});
