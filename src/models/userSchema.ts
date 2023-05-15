import { Schema, Document, model } from 'mongoose'
/*
ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).
Nombre del usuario.
Actividades que realiza: Correr o bicicleta.
Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.
Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.
Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.
Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.
Retos activos: IDs de los retos que el usuario está realizando actualmente.
Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.
*/

/**
 * Interfaz que define las propiedades que debe tener un usuario
 * @property id ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).
 * @property name Nombre del usuario.
 * @property activities Actividades que realiza: Correr o bicicleta.
 * @property friends Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.
 * @property groups Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.
 * @property statistics Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.
 * @property favoriteTracks Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.
 * @property activeChallenges Retos activos: IDs de los retos que el usuario está realizando actualmente.
 * @property historicTracks Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.
 */
interface userDocumentInterface extends Document {
    id: string;
    name: string;
    activities: "Correr" | "Bicicleta";
    friends: { _id: Schema.Types.ObjectId }[];
    historicTracks: {date: Date, _id: Schema.Types.ObjectId }[];
}

/**
 * Esquema de Mongoose para los usuarios
 * @property id ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).
 * @property name Nombre del usuario.
 * @property activities Actividades que realiza: Correr o bicicleta.
 * @property friends Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.
 * @property groups Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.
 * @property statistics Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.
 * @property favoriteTracks Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.
 * @property activeChallenges Retos activos: IDs de los retos que el usuario está realizando actualmente.
 * @property historicTracks Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.
 */
const userSchema = new Schema<userDocumentInterface>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    activities: {
        type: String,
        required: true,
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    historicTracks: [{
        date: {
            type: Date,
        },
        track: {
            type: Schema.Types.ObjectId,
            ref: "tracks",
        }
    }]
  });

  export const userModel = model<userDocumentInterface>('users', userSchema);