import { Schema, Document, model } from 'mongoose'
import validator from 'validator'
/*
ID único del grupo.
Nombre del grupo.
Participantes: IDs de los miembros del grupo.
Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.
Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.
Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras actividades de manera individual.*/

interface groupDocumentInterface extends Document {
    id: string;
    name: string;
    participants: { _id: Schema.Types.ObjectId }[];
    //stats: string[];
    //ranking: string[];
    //favoriteRoutes: string[];
    historicTracks: {date: Date, _id: Schema.Types.ObjectId }[];
  }

const groupSchema = new Schema<groupDocumentInterface>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "users",
    }],
    historicTracks: [{
        date: {
            type: Date,
        },
        track: {
            type: Schema.Types.ObjectId,
            ref: "tracks",
        }
    }],
});

export const groupModel = model<groupDocumentInterface>('groups', groupSchema);