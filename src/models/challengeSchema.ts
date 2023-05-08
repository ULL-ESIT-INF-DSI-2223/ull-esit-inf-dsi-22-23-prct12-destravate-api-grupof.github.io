import { Schema, Document, model } from 'mongoose'
import validator from 'validator'
/*
ID único del reto.
Nombre del reto.
Rutas que forman parte del reto.
Tipo de actividad del reto: bicicleta o correr.
Km totales a realizar (como la suma de los kms de las rutas que lo engloban).
Usuarios que están realizando el reto.
*/
interface challengeDocumentInterface extends Document {
    id: string;
    name: string;
    routes: string[];
    activity: "Correr" | "Bicicleta";
    //totalKm: number;
    users: string[];
}

const challengeSchema = new Schema<challengeDocumentInterface>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    routes: {
        type: [String],
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    users: {
        type: [String],
        required: true,
    },
});

export const challengeModel = model<challengeDocumentInterface>('challenges', challengeSchema);
