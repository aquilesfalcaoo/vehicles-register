import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Request, Response } from 'express';
import { VehiclesController } from '../../controllers/VehiclesController';
import { handleError } from '../../utils/handleError';

jest.mock('../../utils/handleError', () => ({
  handleError: jest.fn(),
}));

const mockedHandleError = handleError as jest.MockedFunction<typeof handleError>;

function createResponse(): Response {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  return res;
}

describe('VehiclesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a list of vehicles with status 200', async () => {
    const vehicles = [
      {
        model: 'Civic',
        isZeroKm: false,
        licensePlate: 'ABC1234',
        color: 'Black',
        renavam: '12345678901',
      },
    ];
    const service = { getVehicles: jest.fn().mockResolvedValue(vehicles as never) };
    const controller = new VehiclesController(service as never);
    const res = createResponse();

    await controller.getVehicles({} as Request, res);

    expect(service.getVehicles).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(vehicles);
  });

  it('creates a vehicle and responds with status 201', async () => {
    const vehicleData = {
      model: 'Corolla',
      isZeroKm: true,
      licensePlate: 'XYZ9999',
      color: 'White',
      renavam: '10987654321',
    };
    const service = { addVehicle: jest.fn().mockResolvedValue(vehicleData as never) };
    const controller = new VehiclesController(service as never);
    const res = createResponse();

    await controller.addVehicle({ body: vehicleData } as Request, res);

    expect(service.addVehicle).toHaveBeenCalledWith(vehicleData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle added successfully', vehicle: vehicleData });
  });

  it('responds with 404 when vehicle is not found by id', async () => {
    const service = { getVehicleById: jest.fn().mockResolvedValue(null as never) };
    const controller = new VehiclesController(service as never);
    const res = createResponse();

    await controller.getVehicleById({ params: { id: 'missing-id' } } as unknown as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
  });

  it('responds with 200 when vehicle is updated successfully', async () => {
    const updatedVehicle = {
      model: 'HB20',
      isZeroKm: false,
      licensePlate: 'AAA0000',
      color: 'Silver',
      renavam: '22222222222',
    };
    const service = { updateVehicle: jest.fn().mockResolvedValue(updatedVehicle as never) };
    const controller = new VehiclesController(service as never);
    const res = createResponse();

    await controller.updateVehicle({ params: { id: 'vehicle-id' }, body: updatedVehicle } as unknown as Request, res);

    expect(service.updateVehicle).toHaveBeenCalledWith('vehicle-id', updatedVehicle);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
  });

  it('calls handleError when an unexpected error happens', async () => {
    const service = { getVehicles: jest.fn().mockRejectedValue(new Error('boom') as never) };
    const controller = new VehiclesController(service as never);
    const res = createResponse();

    await controller.getVehicles({} as Request, res);

    expect(mockedHandleError).toHaveBeenCalledWith(res, expect.any(Error));
  });
});
