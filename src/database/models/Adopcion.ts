import { Schema, model } from 'mongoose';
import type { HydratedDocument, Types } from 'mongoose';

export type EstadoAdopcionFinal = 'activa' | 'anulada' | 'finalizada';

export interface IAdopcion {
  solicitud: Types.ObjectId;
  fechaAdopcion: Date;
  compromisoFirmado: boolean;
  condicionesAdopcion?: string;
  estadoAdopcion: EstadoAdopcionFinal;
  observaciones?: string;
}

export type AdopcionDocument = HydratedDocument<IAdopcion>;

const adopcionSchema = new Schema<IAdopcion>(
  {
    solicitud: {
      type: Schema.Types.ObjectId,
      ref: 'SolicitudAdopcion',
      required: true,
      unique: true,
    },
    fechaAdopcion: {
      type: Date,
      default: Date.now,
    },
    compromisoFirmado: {
      type: Boolean,
      default: false,
    },
    condicionesAdopcion: {
      type: String,
      trim: true,
    },
    estadoAdopcion: {
      type: String,
      required: true,
      enum: ['activa', 'anulada', 'finalizada'],
      default: 'activa',
      maxlength: 30,
    },
    observaciones: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'adopciones',
    versionKey: false,
  }
);

export const AdopcionModel = model<IAdopcion>('Adopcion', adopcionSchema);