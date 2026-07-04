import { Schema, model } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type RolUsuario = 'oferente' | 'solicitante' | 'administrador';

export interface IUsuario {
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  rol: RolUsuario;
  estado: boolean;
}

export type UsuarioDocument = HydratedDocument<IUsuario>;

const usuarioSchema = new Schema<IUsuario>(
  {
    nombreUsuario: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    contrasena: {
      type: String,
      required: true,
      maxlength: 255,
      select: false,
    },
    rol: {
      type: String,
      required: true,
      enum: ['oferente', 'solicitante', 'administrador'],
      maxlength: 30,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'usuarios',
    versionKey: false,
  }
);

export const UsuarioModel = model<IUsuario>('Usuario', usuarioSchema);