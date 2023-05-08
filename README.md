# [PRÁCTICA 12. DESTRAVATE: API NODE/EXPRESS](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof.git). 

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof?branch=main)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupof/actions/workflows/coveralls.yml)

## Carla Oval Torres, Jairo Alonso Abreu, Gabi Vacaru.

## Índice <a name="índice"></a>
1. [Introducción](#introducción)
2. [Descripción de los requisitos del sistema](#requisitos)
3. [Funcionamiento](#funcionamiento)
    1. [Tipos de datos (rutas, retos, usuarios y grupos)](#tipos)
    2. [Colecciones de datos](#colecciones)
    3. [Schemas](#schemas)
    4. [Base de datos](#database)
    5. [Programa principal](#principal)
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

>

### Schemas <a name="schemas"></a>
> [Volver al índice](#índice)

> 

####

### Base de datos <a name="database"></a>
> [Volver al índice](#índice)

> 

### Programa principal <a name="principal"></a>
> [Volver al índice](#índice)

>

### Conclusiones <a name="conclusiones"></a>
> [Volver al índice](#índice)


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