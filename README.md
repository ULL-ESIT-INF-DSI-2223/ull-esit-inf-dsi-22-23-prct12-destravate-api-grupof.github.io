# [PRÁCTICA 12. DESTRAVATE: API NODE/EXPRESS](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-grupof.github.io.git). 

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-grupof.github.io/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-grupof.github.io?branch=main)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-grupof.github.io/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-grupof.github.io/actions/workflows/coveralls.yml)

## Carla Oval Torres, Jairo Alonso Abreu, Gabi Vacaru.

## Índice <a name="índice"></a>
1. [Introducción](#introducción)
2. [Descripción de los requisitos del sistema](#requisitos)
3. [Funcionamiento](#funcionamiento)
    1. [Schemas/Modelos](#schemas)
    2. [Rutas](#rutas)
    3. [Controladores](#controladores)
    4. [Tests](#tests)
    5. [Despliegue](#despliegue)
3. [Conclusiones](#conclusiones)
4. [Referencias](#referencias)

## Introducción <a name="introducción"></a>
> [Volver al índice](#índice)

En esta práctica, la segunda grupal de la asignatura, tendrá que implementar un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de un registro de actividades deportivas.

Todo el código desarrollado deberá estar alojado en el repositorio generado tras la aceptación de la asignación grupal de GitHub Classroom. En ese sentido, utilice en dicho repositorio una estructura de proyecto similar a la que hemos visto en clase.

Además, tendrá que comentar en un informe la solución diseñada, haciendo hincapié en las decisiones de diseño que ha implementado.

Deberá utilizar MongoDB/MongoDB Atlas como sistema de base de datos no relacional, además de Mongoose, para gestionar la base de datos desde Node.js. Además, utilice las opciones y validadores que estime oportunos en sus esquemas.

Deberá desplegar el API en cyclic. En las últimas sesiones de teoría, veremos un ejemplo sencillo que ilustrará lo anterior.

Por último, deberá grabar un vídeo de 10 minutos de duración máxima, en el que todos los miembros del grupo deben intervenir. El objetivo del vídeo es llevar a cabo una descripción de todas las fases del desarrollo: código fuente implementado, documentación, pruebas, integración continua, calidad del código y despliegue.

## Descripción de los requisitos del sistema <a name="requisitos"></a>
> [Volver al índice](#índice)

> A continuación, se enumeran algunos requisitos que deberá cumplir el API, en lo que respecta a las diferentes rutas o puntos de acceso JSON que deberá proporcionar.
> 
> 
> Track
>
> En la ruta /tracks del API, se deberá poder crear, leer, actualizar o borrar una ruta (deportiva) a través de los métodos HTTP necesarios.
> Para cada ruta incluida dentro del sistema, se debe almacenar la información siguiente:
>
> 1. ID único de la ruta.
> 2. Nombre de la ruta.
> 3. Geolocalización del inicio (coordenadas).
> 4. Geolocalización del final de la ruta (coordenadas).
> 5. Longitud de la ruta en kilómetros.
> 6. Desnivel medio de la ruta.
> 7. Usuarios que han realizado la ruta (IDs).
> 8. Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
> 9. Calificación media de la ruta.
>
>La operación de lectura o consulta podrá llevarse a cabo de dos maneras diferentes: o bien utilizando una query string donde se consulte por el nombre de la ruta deportiva, o bien utilizando el identificador único de la ruta como parámetro. Las operaciones de modificación y borrado de una ruta también se podrán llevar a cabo de ambos modos.
>
> 
>Usuarios
>
>En la ruta /users del API, se deberá poder crear, leer, actualizar o borrar un usuario a través de los métodos HTTP necesarios.
>Dentro del sistema, necesitamos la siguiente información de los usuarios:
>
> 1. ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).
> 2. Nombre del usuario.
> 3. Actividades que realiza: Correr o bicicleta.
> 4. Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.
> 5. Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.
> 6. Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.
> 7. Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.
> 8. Retos activos: IDs de los retos que el usuario está realizando actualmente.
> 9. Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.
>
> La operación de lectura o consulta podrá llevarse a cabo de dos maneras diferentes: o bien utilizando una query string donde se consulte por el nombre del usuario, o bien utilizando el identificador único del usuario como parámetro. Las operaciones de modificación y borrado de un usuario también se podrán llevar a cabo de ambos modos.
> 
> 
> Grupos
> 
> En la ruta /groups del API, se deberá poder crear, leer, actualizar o borrar una grupo a través de los métodos HTTP necesarios.
> Un grupo de usuarios engloba la información de los usuarios que se unen para realizar rutas juntos.
> 
> 1. ID único del grupo.
> 2. Nombre del grupo.
> 3. Participantes: IDs de los miembros del grupo.
> 4. Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
> 5. Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.
> 6. Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.
> 7. Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. 
> 
> Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras actividades de manera individual.
> 
> La operación de lectura o consulta podrá llevarse a cabo de dos maneras diferentes: o bien utilizando una query string donde se consulte por el nombre del grupo, o bien utilizando el identificador único del grupo como parámetro. Las operaciones de modificación y borrado de una grupo también se podrán llevar a cabo de ambos modos.
> 
> 
> Retos
> 
> En la ruta /challenges del API, se deberá poder crear, leer, actualizar o borrar una reto a través de los métodos HTTP necesarios.
> 
> Los retos serán otra entidad dentro del sistema. Esta entidad deberá contener toda la información asociada a objetivos de entrenamientos:
> 
> 1. ID único del reto.
> 2. Nombre del reto.
> 3. Rutas que forman parte del reto.
> 4. Tipo de actividad del reto: bicicleta o correr.
> 5. Km totales a realizar (como la suma de los kms de las rutas que lo engloban).
> 6. Usuarios que están realizando el reto.

La operación de lectura o consulta podrá llevarse a cabo de dos maneras diferentes: o bien utilizando una query string donde se consulte por el nombre del reto, o bien utilizando el identificador único del reto como parámetro. Las operaciones de modificación y borrado de un reto también se podrán llevar a cabo de ambos modos.


### Funcionamiento <a name="funcionamiento"></a>
> [Volver al índice](#índice)

> Esta API pretende funcionar como un sistema de gestión de rutas deportivas. Se utiliza el framework Express.js para la creación de la API, además, se ha utilizado la base de datos MongoDB para almacenar la información de la aplicación, y para la conexión con la base de datos, se ha utilizado el paquete mongoose. 

La estructura de nuestro código TypeScript es la siguiente:

````bash
.github
coverage
docs
node_modules
src
├── controllers
│   ├── challenge.controller.ts
│   ├── group.controller.ts
│   ├── track.controller.ts
│   └── user.controller.ts
├── database
│   └── mongoose.ts
├── index.ts
├── models
│   ├── challengeSchema.ts
│   ├── groupSchema.ts
│   ├── trackSchema.ts
│   └── userSchema.ts
├── routes
│   ├── challengeRouter.ts
│   ├── groupRouter.ts
│   ├── trackRouter.ts
│   └── userRouter.ts
├── serverTest.ts
└── utils
    └── functions.ts
tests
├── challenge.spec.ts
├── group.spec.ts
├── track.spec.ts
└── user.spec.ts
.gitignore
package-lock.json
package.json
README.md
tsconfig.json
````	

Donde src es la carpeta donde se encuentra el código fuente de la aplicación, tests es la carpeta donde se encuentra el código fuente de los tests, docs es la carpeta donde se encuentra la documentación generada por TypeDoc, coverage es la carpeta donde se encuentra la información de la cobertura de los tests y node_modules es la carpeta donde se encuentran las dependencias de nuestro proyecto.

Dentro del directorio src, tenemos los siguientes directorios y ficheros:

- controllers: contiene los controladores de la aplicación.
- database: contiene el fichero de configuración de la base de datos.
- odels: contiene los modelos de la aplicación.
- routes: contiene las rutas de la aplicación.
- utils: contiene las funciones auxiliares de la aplicación.
- index.ts: fichero principal de la aplicación.
- serverTest.ts: fichero principal de los tests.
 

### Schemas/Modelos<a name="schemas"></a>
> [Volver al índice](#índice)

> En la carpeta models se encuentran los modelos de la aplicación. Estos modelos son los que se utilizan para crear los documentos en la base de datos. Los modelos son los siguientes:

- challengeSchema.ts: modelo de los retos.
- groupSchema.ts: modelo de los grupos.
- trackSchema.ts: modelo de las rutas.
- userSchema.ts: modelo de los usuarios.

A contiuación explicaremos brevemente la estructura de cada uno de los modelos. Adelantamos que para cada uno, habrá de crearse un controlador, una ruta y un test. Además el proceso de creación de los modelos es igual para todos: se crea una interfaz con los campos que tendrá el modelo, se crea el modelo y se exporta.

#### ChallengeSchema.ts <a name="challengeSchema"></a>

> El modelo de datos para los retos es el siguiente:

````typescript	
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
````	

Primero, se importan las dependencias necesarias para definir el modelo: Schema, Document y model de la biblioteca Mongoose. Luego se define la interfaz challengeDocumentInterface que define los campos que compondrán el documento del reto.

El modelo challengeSchema se crea utilizando la interfaz definida anteriormente, especificando los campos de cada propiedad que compondrá el esquema de la base de datos. La propiedad id es del tipo String, es obligatoria y única. La propiedad name es del tipo String y también es obligatoria. La propiedad tracks es una matriz de objetos Schema.Types.ObjectId que representan los identificadores de los documentos de la colección tracks. La propiedad activity es una cadena que representa el tipo de actividad que se debe realizar, que puede ser "Correr" o "Bicicleta". Por último, la propiedad users es una matriz de objetos Schema.Types.ObjectId que representan los identificadores de los documentos de la colección users.

Finalmente, se exporta el modelo challengeModel para que pueda ser utilizado en otras partes de la aplicación.

#### GroupSchema.ts <a name="groupSchema"></a>

> El modelo de datos para los grupos es el siguiente:

````typescript	
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
````	

Primero, se importan los elementos necesarios de Mongoose, incluyendo el tipo de esquema, el tipo de documento y el modelo.

Luego, se define una interfaz groupDocumentInterface que define la forma de los documentos que se almacenarán en la colección "groups" de la base de datos. Esta interfaz describe los campos que se almacenarán en cada documento, incluyendo:

- id: un identificador único para el grupo
- name: el nombre del grupo
- participants: una lista de IDs de los miembros del grupo
- historicTracks: una lista de las rutas realizadas por el grupo, junto con las fechas en que se realizaron.

A continuación, se define un esquema groupSchema utilizando la interfaz definida anteriormente. El esquema especifica los tipos y las restricciones de los campos definidos en la interfaz. En este caso, el campo "id" es obligatorio, único y debe ser una cadena de caracteres. El campo "name" es obligatorio y también debe ser una cadena de caracteres. El campo "participants" es una matriz de ObjectIds que se refieren a documentos de usuarios en la colección "users" de la base de datos. El campo "historicTracks" es una matriz de objetos que contienen una fecha y una referencia a un documento de ruta en la colección "tracks" de la base de datos.

Finalmente, se exporta el modelo de grupo utilizando el esquema definido y el método model() de Mongoose. El modelo se guarda en la variable groupModel.

#### TrackSchema.ts <a name="trackSchema"></a>

> El modelo de datos para las rutas es el siguiente:

````typescript	
import { Schema, Document, model } from 'mongoose'

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
````	

El modelo de datos se define como una interfaz TypeScript trackDocumentInterface, que extiende la interfaz Document de Mongoose y define las propiedades que tendrán los documentos de esta colección en la base de datos.

Las propiedades incluyen:

- id: un campo de tipo String que es requerido y debe ser único.
- name: un campo de tipo String que es requerido y define el nombre de la ruta.
- startCoords y endCoords: campos de tipo String que representan las coordenadas de inicio y finalización de la ruta y son requeridos.
- long: un campo de tipo Number que es requerido y define la longitud de la ruta en kilómetros.
- unevenness: un campo de tipo Number que es requerido y define la cantidad de desnivel acumulado en metros a lo largo de la ruta.
- activities: un campo de tipo String que es requerido y define el tipo de actividad que se puede realizar en la ruta, que puede ser "Correr" o "Bicicleta".
- finalized: un arreglo de objetos de tipo Schema.Types.ObjectId que se refieren a usuarios que han finalizado esta ruta.
- calification: un campo de tipo Number que es requerido y representa la calificación promedio que ha recibido esta ruta de los usuarios que la han finalizado.

El esquema (trackSchema) se crea a partir de la interfaz trackDocumentInterface y se usa para definir el modelo de datos en la base de datos MongoDB a través de Mongoose. Finalmente, se exporta este modelo de datos utilizando model<trackDocumentInterface>('tracks', trackSchema) para que pueda ser utilizado en la aplicación.

#### UserSchema.ts <a name="userSchema"></a>

> El modelo de datos para los usuarios es el siguiente:

````typescript	
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

interface userDocumentInterface extends Document {
    id: string;
    name: string;
    activities: "Correr" | "Bicicleta";
    friends: { _id: Schema.Types.ObjectId }[];
    groups: { _id: Schema.Types.ObjectId }[];
    //stats: string[];
    //favoriteRoutes: string[];
    //activeChallenges: string[];
    historicTracks: {date: Date, _id: Schema.Types.ObjectId }[];
}

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
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "groups"
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
````	

En la primera sección del código, se importan las clases Schema, Document y model de Mongoose.

A continuación, se define una interfaz llamada userDocumentInterface que extiende de Document. Esta interfaz define los campos que se utilizarán para crear y manipular los objetos de usuario. Los campos que se incluyen son:

- id: Es el ID único del usuario. Puede ser un valor generado automáticamente por el sistema o un nombre de usuario creado por el usuario durante el registro. Se define como una cadena de caracteres (string) y es obligatorio (required: true) y único (unique: true).
- name: Es el nombre del usuario. Se define como una cadena de caracteres y es obligatorio.
- activities: Es una cadena que representa las actividades que realiza el usuario. En este caso, puede ser "Correr" o "Bicicleta". Se define como una cadena de caracteres y es obligatorio.
- friends: Es una colección de objetos que representan los IDs de los amigos del usuario. Se define como un arreglo de objetos que contienen una propiedad _id de tipo Schema.Types.ObjectId. Cada uno de estos IDs debe hacer referencia a un objeto de usuario existente en la base de datos.
- groups: Es una colección de objetos que representan los IDs de los grupos de amigos del usuario. Se define como un arreglo de objetos que contienen una propiedad _id de tipo Schema.Types.ObjectId. Cada uno de estos IDs debe hacer referencia a un objeto de grupo existente en la base de datos.
- historicTracks: Es una colección de objetos que representan las rutas que ha realizado el usuario. Se define como un arreglo de objetos que contienen una propiedad date de tipo Date, que representa la fecha en la que se realizó la ruta, y una propiedad track de tipo Schema.Types.ObjectId, que hace referencia a un objeto de ruta existente en la base de datos.

Después, se crea un nuevo objeto Schema de Mongoose llamado userSchema, que toma como parámetro la interfaz userDocumentInterface. En este objeto se definen las propiedades de cada campo que se van a utilizar en el modelo de datos.

Finalmente, se exporta un modelo de datos llamado userModel que utiliza el esquema userSchema y se le asigna la colección "users" de la base de datos. Este modelo permitirá crear, leer, actualizar y eliminar objetos de usuario en la base de datos MongoDB a través de Node.js.

### Rutas <a name="rutas"></a>
> [Volver al índice](#índice)

> En la carpeta routes se encuentran las rutas de la aplicación que son aquellas con las que se puede interactuar a través de la API mediante las peticiones que hacemos con ThunderClient. Las rutas son las siguientes:

- challengeRouter.ts: rutas de los retos.
- groupRouter.ts: rutas de los grupos.
- trackRouter.ts: rutas de las rutas.
- userRouter.ts: rutas de los usuarios.

A contiuación explicaremos brevemente el código para cada una de las rutas.

#### ChallengeRouter.ts <a name="challengeRouter"></a>

> La ruta de los retos es la que se encarga de gestionar las peticiones relacionadas con los retos. Las peticiones que se pueden realizar son las siguientes:

- GET /challenges: devuelve todos los retos.
- GET /challenge/:id: devuelve el reto con el ID especificado.
- GET /challenge: devuelve el reto con el ID especificado.
- POST /challenge: crea un nuevo reto.
- PATCH /challenge/:id: actualiza el reto con el ID especificado.
- DELETE /challenge/:id: elimina el reto con el ID especificado.
- DELETE /challenge: elimina el reto con el ID especificado.

````typescript
import express from 'express';
import { createChallenge, deleteChallenge, getChallengeById, getChallenges, updateChallenge } from '../controllers/challenge.controller.js';

const router = express.Router();

// Grupos para usuarios
router.get('/challenges', getChallenges);
router.get('/challenge/:id', getChallengeById);
router.get('/challenge', getChallengeById);
router.post('/challenge', createChallenge);
router.patch('/challenge/:id', updateChallenge);
router.patch('/challenge', updateChallenge);
router.delete('/challenge/:id', deleteChallenge);
router.delete('/challenge', deleteChallenge);

export default router;
````

Este código crea un router de Express para manejar las diferentes rutas relacionadas con los retos o desafíos en una aplicación.

La función express.Router() crea una instancia de un objeto router de Express, el cual puede ser utilizado para crear rutas HTTP y asociarles funciones controladoras.

En este caso, el router tiene varias rutas:

- /challenges: Una ruta para obtener todos los retos existentes en la aplicación. Se utiliza el método HTTP GET.
- /challenge/:id: Una ruta para obtener un reto específico por su ID. El ID del reto se especifica como un parámetro en la URL. Se utiliza el método HTTP GET.
- /challenge: Una ruta para obtener un reto específico por su ID, pero se utiliza una solicitud POST en lugar de GET. Esto se debe a que no se puede especificar el ID del reto en la URL de la solicitud POST.
- /challenge: Una ruta para crear un nuevo reto en la aplicación. Se utiliza el método HTTP POST.
- /challenge/:id: Una ruta para actualizar un reto existente en la aplicación. El ID del reto se especifica como un parámetro en la URL. Se utiliza el método HTTP PATCH.
- /challenge: Una ruta para actualizar un reto existente en la aplicación, pero se utiliza una solicitud PATCH en lugar de GET. Esto se debe a que no se puede especificar el ID del reto en la URL de la solicitud PATCH.
- /challenge/:id: Una ruta para eliminar un reto existente en la aplicación. El ID del reto se especifica como un parámetro en la URL. Se utiliza el método HTTP DELETE.
- /challenge: Una ruta para eliminar un reto existente en la aplicación, pero se utiliza una solicitud DELETE en lugar de GET. Esto se debe a que no se puede especificar el ID del reto en la URL de la solicitud DELETE.

Cada ruta está asociada a una función controladora específica del módulo challenge.controller.js que se encarga de manejar la lógica de la aplicación para cada tipo de solicitud.

#### GroupRouter.ts <a name="groupRouter"></a>

> La ruta de los grupos es la que se encarga de gestionar las peticiones relacionadas con los grupos. Las peticiones que se pueden realizar son las siguientes:

- GET /groups: devuelve todos los grupos.
- GET /group/:id: devuelve el grupo con el ID especificado.
- GET /group: devuelve el grupo con el ID especificado.
- POST /group: crea un nuevo grupo.
- PATCH /group/:id: actualiza el grupo con el ID especificado.
- PATCH /group: actualiza el grupo con el ID especificado.
- PATCH /group/:id/addTrack: añade una ruta al historial de rutas del grupo con el ID especificado.
- DELETE /group/:id: elimina el grupo con el ID especificado.
- DELETE /group: elimina el grupo con el ID especificado.

````typescript
import express from 'express';
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup, addTrackToHistory } from '../controllers/group.controller.js';

const router = express.Router();

// Grupos para usuarios
router.get('/groups', getGroups);
router.get('/group/:id', getGroupById);
router.get('/group', getGroupById);
router.post('/group', createGroup);
router.patch('/group/:id', updateGroup);
router.patch('/group', updateGroup);
router.patch('/group/:id/addTrack', addTrackToHistory)
router.delete('/group/:id', deleteGroup);
router.delete('/group', deleteGroup);

export default router;
````

Este código define un enrutador en Express para manejar las rutas relacionadas con los grupos de usuarios en la aplicación. La primera línea importa el paquete express. Luego, se importan una serie de controladores (createGroup, deleteGroup, getGroupById, getGroups, updateGroup, addTrackToHistory) desde el archivo group.controller.js.

El objeto router se crea mediante la llamada a la función express.Router(). Las rutas se definen a través de métodos HTTP en este objeto router. Cada uno de estos métodos especifica una ruta que coincide con una determinada URL, y una función que se ejecuta cuando se accede a esa ruta. Por ejemplo, el método get especifica una ruta para manejar una solicitud GET a una URL dada, mientras que el método post especifica una ruta para manejar una solicitud POST.

En este caso, las siguientes rutas están definidas en el objeto router:

- /groups: maneja una solicitud GET para obtener todos los grupos.
- /group/:id: maneja una solicitud GET para obtener un grupo por su ID.
- /group: maneja una solicitud GET para obtener un grupo.
- /group: maneja una solicitud POST para crear un nuevo grupo.
- /group/:id: maneja una solicitud PATCH para actualizar un grupo por su ID.
- /group: maneja una solicitud PATCH para actualizar un grupo.
- /group/:id/addTrack: maneja una solicitud PATCH para agregar una ruta a la historia de un grupo.
- /group/:id: maneja una solicitud DELETE para eliminar un grupo por su ID.
- /group: maneja una solicitud DELETE para eliminar un grupo.

Por último, el objeto router se exporta como módulo predeterminado.

#### TrackRouter.ts <a name="trackRouter"></a>

> La ruta de las rutas es la que se encarga de gestionar las peticiones relacionadas con las rutas. Las peticiones que se pueden realizar son las siguientes:

- GET /tracks: devuelve todas las rutas.
- GET /track/:id: devuelve la ruta con el ID especificado.
- GET /track: devuelve la ruta con el ID especificado.
- POST /track: crea una nueva ruta.
- PATCH /track/:id: actualiza la ruta con el ID especificado.
- PATCH /track: actualiza la ruta con el ID especificado.
- DELETE /track/:id: elimina la ruta con el ID especificado.
- DELETE /track: elimina la ruta con el ID especificado.

````typescript
import express from 'express';
import { createTrack, deleteTrack, getTrackById, getTracks, updateTrack } from '../controllers/track.controller.js';

const router = express.Router();

// Rutas para usuarios
router.get('/tracks', getTracks);
router.get('/track/:id', getTrackById);
router.get('/track', getTrackById);
router.post('/track', createTrack);
router.patch('/track/:id', updateTrack);
router.patch('/track', updateTrack);
router.delete('/track/:id', deleteTrack);
router.delete('/track', deleteTrack);

export default router;
````

Como en los casos anteriores definimos un enrutador para una aplicación de seguimiento de actividad física que permite a los usuarios crear, leer, actualizar y eliminar rutas de entrenamiento.

La primera línea del código importa el módulo express que se utiliza para crear la aplicación web. Luego se importan los controladores necesarios para realizar operaciones en las rutas.

El código crea un nuevo enrutador utilizando el método Router() de Express y asigna el enrutador a la variable router. Luego se definen varias rutas utilizando los métodos HTTP GET, POST, PATCH y DELETE. Cada ruta llama a un controlador específico para realizar la operación correspondiente en la base de datos.

Por último, el código exporta el enrutador como módulo predeterminado.

#### UserRouter.ts <a name="userRouter"></a>

> La ruta de los usuarios es la que se encarga de gestionar las peticiones relacionadas con los usuarios. Las peticiones que se pueden realizar son las siguientes:

- GET /users: devuelve todos los usuarios.
- GET /user/:id: devuelve el usuario con el ID especificado.
- GET /user: devuelve el usuario con el ID especificado.
- POST /user: crea un nuevo usuario.
- PATCH /user/:id: actualiza el usuario con el ID especificado.
- PATCH /user: actualiza el usuario con el ID especificado.
- PATCH /user/:id/addTrack: añade una ruta al historial de rutas del usuario con el ID especificado.
- DELETE /user/:id: elimina el usuario con el ID especificado.
- DELETE /user: elimina el usuario con el ID especificado.

````typescript
import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser, addTrackToHistory } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas para usuarios
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/user', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.patch('/user', updateUser);
router.delete('/user/:id', deleteUser);
router.delete('/user', deleteUser);
router.patch('/user/:id/addTrack', addTrackToHistory)

export default router;
````

Como hemos venido haciendo, se definen un conjunto de rutas HTTP para interactuar con recursos de usuario en una aplicación web, utilizando el marco de trabajo de Express. Las rutas se definen en un objeto Router, que es exportado para ser utilizado por la aplicación principal.

El código importa varias funciones desde el módulo ../controllers/user.controller.js, que probablemente implementa la lógica del negocio para manejar las solicitudes de la API. Cada una de estas funciones se asigna a una ruta HTTP específica, utilizando los métodos correspondientes de Express Router. Por ejemplo, el método get se utiliza para manejar solicitudes GET, mientras que el método post se utiliza para manejar solicitudes POST. Las rutas se definen utilizando el método Router.METHOD(PATH, HANDLER), donde METHOD es un método HTTP (por ejemplo, get, post, patch, delete), PATH es una cadena que representa la ruta a manejar y HANDLER es la función que se ejecutará cuando se haga una solicitud a esa ruta.

### Controladores <a name="controladores"></a>
> [Volver al índice](#índice)

> En la carpeta controllers se encuentran los controladores de la aplicación. Estos controladores son los que se encargan de realizar las operaciones de la API. Este conjunto de controladores es el que que maneja mediante funciones la información de las diferentes peticiones HTTP en una API construida con el framework Express y utilizando una base de datos MongoDB alojada en Atlas.

La API se utiliza para interactuar con una base de datos que contiene información sobre grupos de corredores y las rutas que han recorrido.

Los controladores son los siguientes:

- challenge.controller.ts: controlador de los retos.
- group.controller.ts: controlador de los grupos.
- track.controller.ts: controlador de las rutas.
- user.controller.ts: controlador de los usuarios.

A contiuación explicaremos brevemente la estructura de cada uno de los controladores.

#### ChallengeController.ts <a name="challengeController"></a>

> El controlador de los retos es el que se encarga de gestionar las peticiones relacionadas con los retos:

````typescript	
import { Request, Response } from 'express';
import { challengeModel } from '../models/challengeSchema.js';
import { challengeLongAndUnevennes } from '../utils/functions.js';

// Obtener todos los Retos
export const getChallenges = async (req: Request, res: Response) => {
  try {

    const challenges = await challengeModel.find().populate('tracks');
    //Añadir a cada challenge la distancia total de sus tracks y el desnivel medio
    const challengesfinal = challengeLongAndUnevennes(challenges);
    res.status(200).json(challengesfinal);
    console.log('Retos obtenidos correctamente');
  } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los retos');
  }
};

// Obtener una Reto por su ID
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOne({ id: query.id }).populate('tracks');
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        const challengesfinal = challengeLongAndUnevennes([Challenge]);
        res.status(200).json(challengesfinal);
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findById(id).populate('tracks');
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        const challengesfinal = challengeLongAndUnevennes([Challenge]);
        res.status(200).json(challengesfinal);
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva Reto
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = new challengeModel(req.body);
    await challenge.save();
    res.status(200).json({ message: 'Reto creado correctamente' , challenge });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Reto existente
export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto actualizado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto actualizado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Reto existente
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Challenge = await challengeModel.findOneAndDelete({ id: query.id });
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto borrado correctamente' });
      }
    } else {
      const { id } = req.params;
      const Challenge = await challengeModel.findByIdAndDelete(id);
      if (!Challenge) {
        res.status(404).json({ message: 'Reto no encontrado' });
      } else {
        res.status(200).json({ message: 'Reto borrado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};
````	
La primera función, getChallenges, se encarga de obtener todos los retos almacenados en la base de datos, calcular la distancia total de los tracks de cada uno y su desnivel medio, y devolver una respuesta HTTP con un código de estado 200 y un objeto JSON que contiene los retos y su información de distancia y desnivel.

La segunda función, getChallengeById, se encarga de obtener un reto en específico, ya sea por su ID (cuando se pasa como un parámetro de consulta) o por el ID que se encuentra en los parámetros de la URL. La función también calcula la distancia total y el desnivel medio del reto antes de devolver la respuesta HTTP.

La tercera función, createChallenge, se encarga de crear un nuevo reto a partir de la información proporcionada en la petición HTTP. El objeto JSON que representa el nuevo reto se guarda en la base de datos y se devuelve una respuesta HTTP con un código de estado 200 y un mensaje de confirmación.

La cuarta función, updateChallenge, actualiza un reto existente en la base de datos, ya sea por su ID (pasado como un parámetro de consulta) o por el ID que se encuentra en los parámetros de la URL. La función utiliza la información proporcionada en la petición HTTP para actualizar el reto y devuelve una respuesta HTTP con un código de estado 200 y un mensaje de confirmación.

La quinta función, deleteChallenge, se encarga de eliminar un reto existente de la base de datos, ya sea por su ID (pasado como un parámetro de consulta) o por el ID que se encuentra en los parámetros de la URL. La función elimina el reto y devuelve una respuesta HTTP con un código de estado 200 y un mensaje de confirmación.

#### GroupController.ts <a name="groupController"></a>

El controlador de grupos contiene las funciones necesarias para gestionar los grupos de usuarios de la aplicación. 

````typescript	
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index.js';
import { expect } from 'chai';
import 'mocha'

chai.use(chaiHttp);
describe('Group routes', () => {
    let _idTestGroup: string;
    let server: any;
    const testGroup1 = {
      id: "GroupTest1",
      name: 'Test',
      participants: [],
      historicTracks: [],
     
    };
    const testGroup1Modi = {
        id: "GroupTest1",
        name: 'Test changed',
        
      }
    const testGroup2 = {
        id: "GroupTest2",
        name: 'Test',
       
      };
      const testGroup2Modi = {
        id: "GroupTest2",
        name: 'Test changed',
        
      }
      
    describe('POST /:group', () => {
        //Crear usuarios
        it('should add a testGroup1', (done) => {
        chai
            .request(app)
            .post(`/groups/group`)
            .set('Content-Type', 'application/json')
            .send(testGroup1)
            .end((err, res) => {
            _idTestGroup = res.body.group._id
            console.log("GROUP: ")
            console.log(_idTestGroup);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            
            done();
            });
        });
        it('should add a testGroup2', (done) => {
            chai
                .request(app)
                .post(`/groups/group`)
                .set('Content-Type', 'application/json')
                .send(testGroup2)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
       
    //Errores al crear usuarios
    it('should give us an error when try to add a new thats not correct', (done) => {
        chai
            .request(app)
            .post(`/groups/group`)
            .set('Content-Type', 'application/json')
            .send({id: testGroup1.id, name : testGroup1.name})
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    //Modificar usuarios
   describe('PATCH /:Group', () => {
        it('Should change name of testGroup1 by id', (done) => {
            chai
                .request(app)
                .patch(`/groups/group/${_idTestGroup}`)
                .set('Content-Type', 'application/json')
                .send(testGroup1Modi)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change name of testGroup2 by query', (done) => {
                chai
                    .request(app)
                    .patch(`/groups/group/?id=GroupTest2`)
                    .set('Content-Type', 'application/json')
                    .send(testGroup2Modi)
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:Group', () => {
        it('should all the Groups', (done) => {
            chai
                .request(app)
                .get(`/groups/groups`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
                });
            });
            it('should get testGroup1 by id', (done) => {
                chai
                    .request(app)
                    .get(`/groups/group/${_idTestGroup}`)
                    .set('Content-Type', 'application/json')
                    .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                    });
                });
                it('should get testGroup2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/groups/group/?id=GroupTest2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        console.log(res.body)
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?Group', () => {
        it('should delete the tests Group 1 by id', (done) => {
            chai
                .request(app)
                .delete(`/groups/group/${_idTestGroup}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
        it('should delete the tests Group 2 by query', (done) => {
        chai
            .request(app)
            .delete(`/groups/group/?id=GroupTest2`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    });
});
````	
Las funciones del controlador incluyen:

- getGroups: obtiene todos los grupos de la base de datos y devuelve un JSON con los grupos encontrados o un mensaje de error si se produce un error.
- getGroupById: obtiene un grupo por ID y devuelve información sobre el grupo, como las rutas favoritas del grupo, la clasificación de los usuarios y las estadísticas de la historia del grupo. El controlador también maneja la búsqueda de grupos por un parámetro de consulta de ID.
- createGroup: crea un nuevo grupo en la base de datos.
- updateGroup: actualiza un grupo existente en la base de datos.
- deleteGroup: elimina un grupo existente de la base de datos.
- addTrackToHistory: agrega una ruta al historial de un grupo determinado. La función toma el ID del grupo y la información de la ruta (fecha y ruta) del cuerpo de la solicitud y luego actualiza el historial de rutas del grupo.

#### TrackController.ts <a name="trackController"></a>

> El controlador de rutas se encarga de manejar las solicitudes relacionadas con las rutas. Las funciones del controlador incluyen:

````typescript	
import { Request, Response } from 'express';
import { trackModel } from '../models/trackSchema.js';

// Obtener todas las Rutas
export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await trackModel.find();
    res.status(200).json(tracks);
    console.log('Rutas obtenidas correctamente');
  } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener las rutas');
  }
};

// Obtener una Ruta por su ID
export const getTrackById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOne({ id: query.id });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json(Track);
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findById(id);
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json(Track);
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva Ruta
export const createTrack = async (req: Request, res: Response) => {
  try {
    const track = new trackModel(req.body);
    await track.save();
    res.status(200).json({ message: 'Ruta creada correctamente' , track });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una Ruta existente
export const updateTrack = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta actualizada correctamente' });
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta actualizada correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una Ruta existente
export const deleteTrack = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const Track = await trackModel.findOneAndDelete({ id: query.id });
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta borrada correctamente' });
      }
    } else {
      const { id } = req.params;
      const Track = await trackModel.findByIdAndDelete(id);
      if (!Track) {
        res.status(404).json({ message: 'Ruta no encontrada' });
      } else {
        res.status(200).json({ message: 'Ruta borrada correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};
````	
Las funciones del controlador incluyen:

- La función getTracks maneja la operación de Leer todos los registros de la entidad "ruta". Primero, usa el modelo trackModel para obtener todos los registros de la base de datos usando find(). Luego, envía una respuesta JSON con los registros obtenidos y un código de estado HTTP 200 (OK). Si hay algún error durante la operación, envía una respuesta de error con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor).
- La función getTrackById maneja la operación de Leer un registro específico de la entidad "ruta" por su ID. Primero, revisa si el ID es proporcionado en la consulta. Si es así, utiliza findOne() para buscar el registro en la base de datos y envía una respuesta JSON con el registro encontrado y un código de estado HTTP 200 (OK). Si no se encuentra el registro, envía una respuesta de error con un mensaje de error y un código de estado HTTP 404 (No encontrado). Si el ID no se proporciona en la consulta, la función utiliza findById() para buscar el registro en la base de datos utilizando el ID proporcionado en los parámetros de la solicitud.
- La función createTrack maneja la operación de Crear un nuevo registro en la entidad "ruta". Crea un nuevo objeto track utilizando el modelo trackModel y lo guarda en la base de datos usando save(). Luego, envía una respuesta JSON con un mensaje de éxito y el objeto track creado y un código de estado HTTP 200 (OK). Si hay algún error durante la operación, envía una respuesta de error con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor).
- La función updateTrack maneja la operación de Actualizar un registro existente en la entidad "ruta". Revisa si el ID es proporcionado en la consulta o en los parámetros de la solicitud y utiliza findOneAndUpdate() o findByIdAndUpdate() para actualizar el registro en la base de datos. Si el registro se actualiza correctamente, envía una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK). Si no se encuentra el registro, envía una respuesta de error con un mensaje de error y un código de estado HTTP 404 (No encontrado).
- La función deleteTrack maneja la operación de Borrar un registro existente en la entidad "ruta". Revisa si el ID es proporcionado en la consulta o en los parámetros de la solicitud y utiliza findOneAndDelete() o findByIdAndDelete() para eliminar el registro de la base de datos. Si el registro se elimina correctamente, envía una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK). Si no se encuentra el registro, envía una respuesta de error con un mensaje de error y un código de estado HTTP 404 (No encontrado).

#### UserController.ts <a name="userController"></a>

> El controlador de usuario contiene las funciones que se encargan de manejar las peticiones que se realizan a la entidad usuario.

````typescript	
import { Request, Response } from 'express';
import { userModel } from '../models/userSchema.js';
import { challengeModel } from '../models/challengeSchema.js';
import { groupModel } from '../models/groupSchema.js';
import { historyFunction, favoriteRoutes, activeChallenges, getGroupForUser} from '../utils/functions.js';
import mongoose from 'mongoose';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
      const users = await userModel.find().populate('friends', 'name').populate('historicTracks', 'name');
      res.status(200).json(users);
      console.log('Usuarios obtenidos correctamente');
    } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los usuarios');
  }
};

// Obtener un usuario por su ID o por nombre
export const getUserById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOne({ id: query.id }).populate('friends',['id','name']).populate('historicTracks.track');
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        const Groups = await groupModel.find().populate('participants.user', ['id','name'])
        const activeGroups = getGroupForUser(Groups, user.id)
        const stats = historyFunction(user.historicTracks);
        const favTracks = favoriteRoutes(user.historicTracks);
        const challenges = await challengeModel.find();
        const activChallenges = activeChallenges(challenges, user._id.toString());
        res.status(200).json({user: user, activeGroups, stats:{"km semanales": stats[0],"Desnivel semanal": stats[1], "km mensuales": stats[2],"Desnivel mensual": stats[3], "km anuales": stats[4], "Desnivel anual": stats[5]}, favTracks, activChallenges});
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findById(id).populate('friends', 'name').populate('historicTracks.track');
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        const stats = historyFunction(user.historicTracks);
        const favTracks = favoriteRoutes(user.historicTracks);
        const challenges = await challengeModel.find();
        const activChallenges = activeChallenges(challenges, user._id.toString());
        res.status(200).json({user: user, stats:{"km semanales": stats[0],"Desnivel semanal": stats[1], "km mensuales": stats[2],"Desnivel mensual": stats[3], "km anuales": stats[4], "Desnivel anual": stats[5]}, favTracks, activChallenges});
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).json({ message: 'Usuario creado correctamente', user });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario existente
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.id) {
      const user = await userModel.findOneAndDelete({ id: query.id });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario borrado correctamente' });
      }
    } else {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario borrado correctamente' });
      }
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

export const addTrackToHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { date, track } = req.body; // Asegúrate de que el cuerpo de la petición incluye la fecha y el ID de la ruta
    // Encuentra el usuario y actualiza su array historicTracks
    const user = await userModel.findByIdAndUpdate(
      userId, 
      { $push: { historicTracks: { date: new Date(date), track: track } } }, 
      { new: true, useFindAndModify: false } // new: true para devolver el documento actualizado, useFindAndModify: false para utilizar el método findOneAndUpdate de Mongoose en lugar del método findAndModify de MongoDB
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.send(user);

  } catch (error) {
    return res.status(500).send('Server error');
  }
};
````	

Las funciones de controlador de usuario se definen de la siguiente manera:

- getUsers: Esta función maneja una solicitud GET a la ruta "/users" y devuelve una lista de todos los usuarios en la base de datos. Se utiliza el método find() del modelo userModel para obtener todos los usuarios y se utiliza el método populate() para incluir información adicional sobre los usuarios, como sus amigos y las rutas que han completado. Si la solicitud se realiza correctamente, la función devuelve un objeto JSON con una clave "usuarios" que contiene la lista de usuarios.
- getUserById: Esta función maneja una solicitud GET a la ruta "/users/:id" y devuelve información detallada sobre un usuario específico. Si el parámetro id se proporciona como una consulta en la solicitud, se utiliza el método findOne() del modelo userModel para buscar un usuario con el ID especificado y se utiliza el método populate() para incluir información adicional sobre el usuario. Si el parámetro id se proporciona como una parte de la ruta en la solicitud, se utiliza el método findById() del modelo userModel para buscar un usuario con el ID especificado y se utiliza el método populate() para incluir información adicional sobre el usuario. La función devuelve un objeto JSON con información detallada sobre el usuario, incluyendo estadísticas de historial de rutas, rutas favoritas y desafíos activos.
- createUser: Esta función maneja una solicitud POST a la ruta "/users" y crea un nuevo usuario en la base de datos utilizando el modelo userModel. Si la creación de usuario se realiza correctamente, la función devuelve un objeto JSON con un mensaje de confirmación y el usuario creado.
- updateUser: Esta función maneja una solicitud PUT a la ruta "/users/:id" y actualiza la información de un usuario específico en la base de datos utilizando el modelo userModel. Si el parámetro id se proporciona como una consulta en la solicitud, se utiliza el método findOneAndUpdate() del modelo userModel para buscar y actualizar un usuario con el ID especificado. Si el parámetro id se proporciona como una parte de la ruta en la solicitud, se utiliza el método findByIdAndUpdate() del modelo userModel para buscar y actualizar un usuario con el ID especificado. Si la actualización se realiza correctamente, la función devuelve un objeto JSON con un mensaje de confirmación.
- deleteUser: Esta función maneja una solicitud DELETE a la ruta "/users/:id" y elimina un usuario específico de la base de datos utilizando el modelo userModel. Si el parámetro id se proporciona como una consulta en la solicitud, se utiliza el método findOneAndDelete() del modelo userModel para buscar y eliminar un usuario con el ID especificado. Si el parámetro id se proporciona como una parte de la ruta en la solicitud, se utiliza el método findByIdAndDelete() del modelo userModel para buscar y eliminar un usuario con el ID especificado. Si la eliminación se realiza correctamente, la función devuelve un objeto JSON con un mensaje de confirmación.
- addTrackToHistory: Esta función maneja una solicitud POST a la ruta "/users/:id/history" y agrega una nueva ruta al historial de rutas de un usuario identificado por su "id". La nueva ruta se agrega al final de la lista existente de rutas del usuario.

### Base de datos <a name="database"></a>
> [Volver al índice](#índice)

> La base de datos contiene la información de la aplicación, siendo esta las rutas, los retos, los grupos y los usuarios.

La base de datos que se ha utilizado para este proyecto es MongoDB. Para la conexión con la base de datos se ha utilizado el paquete mongoose. La configuración de la base de datos se encuentra en el fichero mongoose.ts que se encuentra en la carpeta database. En este fichero se realiza la conexión con la base de datos y se exporta la conexión para que pueda ser utilizada en otros ficheros de la aplicación.

El contenido del fichero de configuración de la base de datos mongoose.ts es el siguiente:

````typescript
import { connect } from 'mongoose';

connect('mongodb://127.0.0.1:27017/student').then(() => {  *********************************
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});
````

Su código se encarga de establecer una conexión con una base de datos MongoDB utilizando Mongoose, una biblioteca de objetos de modelado de MongoDB para Node.js.

La conexión se establece utilizando la función connect() de Mongoose, que recibe como argumento una cadena de conexión URI a la base de datos MongoDB. En este caso, la cadena de conexión especifica que se utilizará una base de datos llamada "student" en la dirección IP "127.0.0.1" y el puerto "27017". "127.0.0.1" es la dirección IP local, que indica que la base de datos se encuentra en la misma máquina que el servidor Node.js.

La función connect() devuelve una promesa, que se maneja con la función then() y catch(). Si la conexión se establece correctamente, se ejecuta la función then() y se escribe en la consola el mensaje "Connected to the database". Si hay algún error al conectarse a la base de datos, se ejecuta la función catch() y se escribe en la consola el mensaje "Something went wrong when connecting to the database".

Además, se ha hecho uso de MongoDB Atlas para poder desplegar la aplicación en Cyclic. Para ello, se ha creado una base de datos en MongoDB Atlas y se ha cambiado la cadena de conexión URI a la base de datos MongoDB.

### Programa principal <a name="principal"></a>
> [Volver al índice](#índice)

> El programa principal es el fichero index.ts que se encuentra en la carpeta src. En este fichero se encuentra el código principal de la aplicación. En este fichero se importan las rutas de la aplicación y se crea el servidor. El contenido del fichero index.ts es el siguiente:

````typescript
import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import usersRouter from './routes/userRouter.js';
import trackRouter from './routes/trackRouter.js';
import groupRouter from './routes/groupRouter.js';
import challengeRouter from './routes/challengeRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

const uri ="mongodb+srv://user:user123ASDFG@cluster0.mow4vh4.mongodb.net/?retryWrites=true&w=majority";
const uriLocal = "mongodb://127.0.0.1:27017/destravate";

connect(uriLocal).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unable to connect to MongoDB server');
});

app.use('/users', usersRouter);
app.use('/tracks', trackRouter);
app.use('/groups', groupRouter);
app.use('/challenges', challengeRouter);

app.use('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

console.log(Date.now())

export default app;
````

Este código representa a nuestra aplicación de servidor Node.js, que utiliza el Express para manejar las solicitudes HTTP y la biblioteca Mongoose para conectarse a una base de datos MongoDB.

Primero, se importan los módulos necesarios, incluyendo Express, Cors y Mongoose, así como los enrutadores de usuario, track, group y challenge desde los archivos de ruta correspondientes. A continuación, se crea una instancia de la aplicación Express utilizando la función express().

Luego, se configura la aplicación para utilizar el middleware Cors y parsear solicitudes entrantes en formato JSON utilizando las funciones app.use(cors()) y app.use(express.json()), respectivamente.

Se establece la cadena de conexión a la base de datos MongoDB en la variable uriLocal, y se utiliza la función connect() de Mongoose para conectar la aplicación a la base de datos especificada. Si la conexión se establece correctamente, se escribe en la consola el mensaje "Connection to MongoDB server established". Si hay algún error al conectarse a la base de datos, se escribe en la consola el mensaje "Unable to connect to MongoDB server".

A continuación, se especifican las rutas para los enrutadores de usuario, track, group y challenge utilizando la función app.use(). Se establece una ruta de inicio simple que devuelve el mensaje "Hello World!" para cualquier solicitud en la ruta raíz ('/').

Por último, se establece el puerto en el que se ejecutará el servidor. Si una variable de entorno PORT está definida, se utiliza su valor. De lo contrario, se utiliza el valor 4000. El servidor se inicia con la función app.listen(), y se escribe en la consola el mensaje "Server running on port <PORT>".

Finalmente, la instancia de la aplicación se exporta para que pueda ser utilizada en otros archivos.

### Conclusiones <a name="conclusiones"></a>
> [Volver al índice](#índice)

De este proyecto se pueden extraer varias conclusiones y aprendizajes, entre los que destacan:

- La importancia de la documentación y la planificación previa a la implementación de un proyecto.
- La importancia de la organización y la estructuración del código.
- La importancia de la utilización de herramientas de control de versiones como Git.

Además, se han adquirido conocimientos sobre:

- El lenguaje de programación TypeScript.
- El framework Express.
- La biblioteca Mongoose.
- La base de datos MongoDB.
- El lenguaje de consultas MongoDB.
- El uso de la herramienta Thunder Client para realizar peticiones HTTP.


### Referencias <a name="referencias"></a>
> [Volver al índice](#índice)

1. [Entrada de texto](https://www.npmjs.com/package/prompt-sync)
2. [Formato de escape ANSI](https://es.wikipedia.org/wiki/C%C3%B3digo_escape_ANSI#:~:text=Los%20c%C3%B3digos%20de%20escape%20ANSI,color%20o%20moviendo%20el%20cursor.)
3. [Documentación oficial de Node.js](https://nodejs.org/es/docs/)
4. [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
5. [Documentación de Inquirer.js](https://github.com/SBoudrias/Inquirer.js#documentation)
6. [Documentación de Lowdb](https://github.com/typicode/lowdb#usage)
7. [Documentación de TypeDoc](https://typedoc.org/)
8. [Libro "Essential TypeScript: From Beginner to Pro" de Adam FreemanPruebas unitarias con Jest](https://jestjs.io/docs/getting-started)
9. [Coveralls](https://coveralls.io/)
10. [Integración continua con GitHub Actions](https://docs.github.com/es/actions)
11. [Calidad del código con SonarCloud](https://sonarcloud.io/documentation)


### Asignación de Classroom <a name="assignment"></a>
> [Volver al índice](#índice)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/GwypoZrl)