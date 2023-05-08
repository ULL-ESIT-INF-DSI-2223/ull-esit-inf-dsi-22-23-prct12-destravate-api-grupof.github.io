import { Schema, Document, model } from 'mongoose'
import validator from 'validator'
/*
ID único de la ruta.
Nombre de la ruta.
Geolocalización del inicio (coordenadas).
Geolocalización del final de la ruta (coordenadas).
Longitud de la ruta en kilómetros.
Desnivel medio de la ruta.
Usuarios que han realizado la ruta (IDs).
Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
Calificación media de la ruta.
*/

interface routeDocumentInterface extends Document {
   id: string;
    name: string;
    start: string;
    end: string;
    length: number;
    slope: number;
    users: { _id: Schema.Types.ObjectId }[];
    activity: "Correr" | "Bicicleta";
    rating: number;
}

const routeSchema = new Schema<routeDocumentInterface>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    slope: {
        type: Number,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }],
    activity: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

export const routeModel = model<routeDocumentInterface>('routes', routeSchema);
