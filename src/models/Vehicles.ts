import mongoose, { Schema, Model, Types } from 'mongoose';

export interface Vehicle {
  _id?: Types.ObjectId;
  model: string;
  isZeroKm: boolean;
  licensePlate: string;
  color: string;
  renavam: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const vehicleSchema: Schema<Vehicle> = new Schema(
  {
    model: { type: String, trim: true, required: true },
    isZeroKm: { type: Boolean, required: true },
    licensePlate: { type: String, trim: true, uppercase: true, required: true },
    color: { type: String, trim: true, required: true },
    renavam: { type: String, trim: true, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const VehiclesModel: Model<Vehicle> = mongoose.model<Vehicle>('vehicles', vehicleSchema);
