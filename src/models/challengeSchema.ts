import { Schema, Document, model } from 'mongoose'
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
    tracks: { _id: Schema.Types.ObjectId }[];
    activity: "Correr" | "Bicicleta";
    //totalKm: number;
    users: { _id: Schema.Types.ObjectId }[];
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
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: "tracks",
    }],
    activity: {
        type: String,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
});

export const challengeModel = model<challengeDocumentInterface>('challenges', challengeSchema);
