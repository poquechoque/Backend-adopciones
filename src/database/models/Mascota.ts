import { Schema, model } from 'mongoose';
import type { HydratedDocument, Types } from 'mongoose';

export type SexoMascota = 'macho' | 'hembra';
export type TamanoMascota = 'pequeno' | 'mediano' | 'grande';
export type EstadoAdopcionMascota =
  | 'disponible'
  | 'pendiente'
  | 'adoptado'
  | 'cancelado';

export interface IMascota {
  oferente: Types.ObjectId;
  tipoMascota: Types.ObjectId;
  raza: Types.ObjectId;
  nombre: string;
  sexo: SexoMascota;
  fechaNacimientoAprox?: Date;
  edadAproxMeses: number;
  tamano: TamanoMascota;
  pesoKg?: number;
  color: string;
  estadoSalud: string;
  vacunado: boolean;
  esterilizado: boolean;
  desparasitado: boolean;
  fotoPrincipal?: string;
  estadoAdopcion: EstadoAdopcionMascota;
  fechaRegistro: Date;
  estado: boolean;
}

export type MascotaDocument = HydratedDocument<IMascota>;

const mascotaSchema = new Schema<IMascota>(
  {
    oferente: {
      type: Schema.Types.ObjectId,
      ref: 'Oferente',
      required: true,
    },
    tipoMascota: {
      type: Schema.Types.ObjectId,
      ref: 'TipoMascota',
      required: true,
    },
    raza: {
      type: Schema.Types.ObjectId,
      ref: 'Raza',
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    sexo: {
      type: String,
      required: true,
      enum: ['macho', 'hembra'],
      maxlength: 10,
    },
    fechaNacimientoAprox: {
      type: Date,
    },
    edadAproxMeses: {
      type: Number,
      required: true,
      min: 0,
    },
    tamano: {
      type: String,
      required: true,
      enum: ['pequeno', 'mediano', 'grande'],
      maxlength: 20,
    },
    pesoKg: {
      type: Number,
      min: 0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    estadoSalud: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    vacunado: {
      type: Boolean,
      default: false,
    },
    esterilizado: {
      type: Boolean,
      default: false,
    },
    desparasitado: {
      type: Boolean,
      default: false,
    },
    fotoPrincipal: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    estadoAdopcion: {
      type: String,
      required: true,
      enum: ['disponible', 'pendiente', 'adoptado', 'cancelado'],
      default: 'disponible',
      maxlength: 30,
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'mascotas',
    versionKey: false,
  }
);

mascotaSchema.index({ tipoMascota: 1 });
mascotaSchema.index({ raza: 1 });
mascotaSchema.index({ oferente: 1 });
mascotaSchema.index({ estadoAdopcion: 1 });

export const MascotaModel = model<IMascota>('Mascota', mascotaSchema);