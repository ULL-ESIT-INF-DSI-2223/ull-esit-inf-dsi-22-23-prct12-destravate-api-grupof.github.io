import { Schema, Document, model } from 'mongoose'

/**
 * Interfaz que define las propiedades que debe tener un reto
 * @property id ID único del reto.
 * @property name Nombre del reto.
 * @property tracks Rutas que forman parte del reto.
 * @property activity Tipo de actividad del reto: bicicleta o correr.
 * @property totalKm Km totales a realizar (como la suma de los kms de las rutas que lo engloban).
 * @property users Usuarios que están realizando el reto.
 * @property finalized Usuarios que han finalizado el reto.
 * @property calification Calificación del reto.
 */
interface trackDocumentInterface extends Document {
    id: string;
    name: string;
    startCoords: string;
    endCoords: string;
    long: number;
    unevenness: number;
    activities: "Correr" | "Bicicleta";
    finalized: { _id: Schema.Types.ObjectId }[];
    calification: number;
    
}

/**
 * Esquema de Mongoose para los retos
 * @property id ID único del reto.
 * @property name Nombre del reto.
 * @property tracks Rutas que forman parte del reto.
 * @property activity Tipo de actividad del reto: bicicleta o correr.
 * @property totalKm Km totales a realizar (como la suma de los kms de las rutas que lo engloban).
 * @property users Usuarios que están realizando el reto.
 * @property finalized Usuarios que han finalizado el reto.
 * @property calification Calificación del reto.
 */
const trackSchema = new Schema<trackDocumentInterface>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    startCoords: {
        type: String,
        required: true,
    },
    endCoords: {
        type: String,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    unevenness: {
        type: Number,
        required: true,
    },
    activities: {
        type: String,
        required: true,
    },
    finalized: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    calification: {
        type: Number,
        required: true,
    }
  });

  export const trackModel = model<trackDocumentInterface>('tracks', trackSchema);