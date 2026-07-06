import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { VehiclesService } from '../../services/VehiclesService';
import { VehiclesModel } from '../../models/Vehicles';

jest.mock('../../models/Vehicles', () => ({
  VehiclesModel: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockVehiclesModel = VehiclesModel as unknown as {
  find: jest.Mock;
  create: jest.Mock;
  findById: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
};

describe('VehiclesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all vehicles from the database', async () => {
    const vehicles = [
      {
        model: 'Civic',
        isZeroKm: false,
        licensePlate: 'ABC1234',
        color: 'Black',
        renavam: '12345678901',
      },
    ];

    mockVehiclesModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue(vehicles as never),
    });

    const service = new VehiclesService();

    await expect(service.getVehicles()).resolves.toEqual(vehicles);
    expect(mockVehiclesModel.find).toHaveBeenCalledWith({});
  });

  it('creates a vehicle and returns it as a plain object', async () => {
    const vehicleData = {
      model: 'Corolla',
      isZeroKm: true,
      licensePlate: 'XYZ9999',
      color: 'White',
      renavam: '10987654321',
    };
    const createdVehicle = {
      ...vehicleData,
      toObject: jest.fn().mockReturnValue(vehicleData),
    };

    mockVehiclesModel.create.mockResolvedValue(createdVehicle as never);

    const service = new VehiclesService();

    await expect(service.addVehicle(vehicleData as never)).resolves.toEqual(vehicleData);
    expect(mockVehiclesModel.create).toHaveBeenCalledWith(vehicleData);
  });

  it('returns a vehicle by id when it exists', async () => {
    const vehicle = {
      model: 'Onix',
      isZeroKm: false,
      licensePlate: 'QWE1111',
      color: 'Blue',
      renavam: '11111111111',
    };

    mockVehiclesModel.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(vehicle as never),
    });

    const service = new VehiclesService();

    await expect(service.getVehicleById('vehicle-id')).resolves.toEqual(vehicle);
    expect(mockVehiclesModel.findById).toHaveBeenCalledWith('vehicle-id');
  });

  it('returns null when trying to fetch a vehicle without an id', async () => {
    const service = new VehiclesService();

    await expect(service.getVehicleById('')).resolves.toBeNull();
    expect(mockVehiclesModel.findById).not.toHaveBeenCalled();
  });

  it('updates a vehicle and returns the updated document', async () => {
    const updatedVehicle = {
      model: 'HB20',
      isZeroKm: false,
      licensePlate: 'AAA0000',
      color: 'Silver',
      renavam: '22222222222',
    };

    mockVehiclesModel.findByIdAndUpdate.mockReturnValue({
      lean: jest.fn().mockResolvedValue(updatedVehicle as never),
    });

    const service = new VehiclesService();

    await expect(service.updateVehicle('vehicle-id', updatedVehicle as never)).resolves.toEqual(updatedVehicle);
    expect(mockVehiclesModel.findByIdAndUpdate).toHaveBeenCalledWith('vehicle-id', updatedVehicle, {
      new: true,
      runValidators: true,
    });
  });

  it('returns false for delete when id is missing', async () => {
    const service = new VehiclesService();

    await expect(service.deleteVehicle('')).resolves.toBe(false);
    expect(mockVehiclesModel.findByIdAndDelete).not.toHaveBeenCalled();
  });
});
