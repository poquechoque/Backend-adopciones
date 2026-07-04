import { Schema, model } from 'mongoose';
import type { HydratedDocument, Types } from 'mongoose';

export type EstadoSolicitudAdopcion =
  | 'pendiente'
  | 'aprobada'
  | 'rechazada'
  | 'cancelada';

export interface ISolicitudAdopcion {
  postulante: Types.ObjectId;
  mascota: Types.ObjectId;
  fechaSolicitud: Date;
  estadoSolicitud: EstadoSolicitudAdopcion;
  motivoPostulacion: string;
  resultadoEvaluacion?: string;
  puntajeEvaluacion?: number;
  entrevistaRealizada: boolean;
  visitaDomiciliaria: boolean;
  observaciones?: string;
  fechaRespuesta?: Date;
}

export type SolicitudAdopcionDocument =
  HydratedDocument<ISolicitudAdopcion>;

const solicitudAdopcionSchema = new Schema<ISolicitudAdopcion>(
  {
    postulante: {
      type: Schema.Types.ObjectId,
      ref: 'Postulante',
      required: true,
    },
    mascota: {
      type: Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    fechaSolicitud: {
      type: Date,
      default: Date.now,
    },
    estadoSolicitud: {
      type: String,
      required: true,
      enum: ['pendiente', 'aprobada', 'rechazada', 'cancelada'],
      default: 'pendiente',
      maxlength: 30,
    },
    motivoPostulacion: {
      type: String,
      required: true,
      trim: true,
    },
    resultadoEvaluacion: {
      type: String,
      trim: true,
    },
    puntajeEvaluacion: {
      type: Number,
      min: 0,
      max: 100,
    },
    entrevistaRealizada: {
      type: Boolean,
      default: false,
    },
    visitaDomiciliaria: {
      type: Boolean,
      default: false,
    },
    observaciones: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    fechaRespuesta: {
      type: Date,
    },
  },
  {
    collection: 'solicitudes_adopcion',
    versionKey: false,
  }
);

solicitudAdopcionSchema.index(
  { postulante: 1, mascota: 1 },
  { unique: true }
);

solicitudAdopcionSchema.index({ mascota: 1 });
solicitudAdopcionSchema.index({ estadoSolicitud: 1 });

export const SolicitudAdopcionModel = model<ISolicitudAdopcion>(
  'SolicitudAdopcion',
  solicitudAdopcionSchema
);