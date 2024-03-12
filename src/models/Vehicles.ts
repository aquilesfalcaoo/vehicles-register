import mongoose, { Schema, Model } from 'mongoose';

export interface VehiclesProps {
  model: string;
  isZeroKm: boolean;
  licensePlate: string;
  color: string;
  renavam: string;
}

const vehicleSchema: Schema<VehiclesProps> = new Schema(
  {
    model: { type: String, required: true },
    isZeroKm: { type: Boolean, required: true },
    licensePlate: { type: String, required: true },
    color: { type: String, required: true },
    renavam: { type: String, required: true },
  },
  { versionKey: false },
);

export const VehiclesModel: Model<VehiclesProps> = mongoose.model<VehiclesProps>('vehicles', vehicleSchema);
