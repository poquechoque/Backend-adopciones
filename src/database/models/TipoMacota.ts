import { Schema, model } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export interface ITipoMascota {
  nombreTipo: string;
  descripcion?: string;
  estado: boolean;
}

export type TipoMascotaDocument = HydratedDocument<ITipoMascota>;

const tipoMascotaSchema = new Schema<ITipoMascota>(
  {
    nombreTipo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50,
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'tipos_mascota',
    versionKey: false,
  }
);

export const TipoMascotaModel = model<ITipoMascota>(
  'TipoMascota',
  tipoMascotaSchema
);