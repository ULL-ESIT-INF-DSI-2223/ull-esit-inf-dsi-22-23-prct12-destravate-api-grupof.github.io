import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ResponseType } from "../types/responseType.js";
import { readFiles } from "../operations/readFile.js";
import { funkoSchema } from "../schema/funkoSchema.js";
import { createUser } from "../operations/createUser.js";
import { genre } from "../types/genre.js";
import { type } from "../types/type.js";
import { writeFiles } from "../operations/writeFile.js";
import { listRead } from "../commands/listReadFunkos.js";
import { MongoClient, ObjectId } from "mongodb"

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';

export const app = express();
const __dirname = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/funko/"
);
app.use(express.static(__dirname));
/**
 * Funcion que devuelve un listado de funkos, un funko en concreto o crea un nuevo usuario
 */
app.get("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
  if (typeof req.query.action !== undefined && req.query.action !== "") {
    if (typeof req.query.user !== undefined && req.query.user !== "") {
      
      if (req.query.action === "-c") {
        createUser(req.query.user as string, (err) => {
          if (err) {
            response.success = false;
            response.error = err;
            res.send(response);
          } else {
            response.success = true;
            response.error = "Usuario creado con éxito";
            res.send(response);
          }
        });
      } else if (req.query.action as string == "-l"){
        MongoClient.connect(dbURL).then((client) => {
          const db = client.db(dbName);
        
          return db.collection<funkoSchema>(req.query.user as string).find().toArray();
        }).then((funkolist) => {
          response.success = true;
          response.funkoPops = funkolist;
          res.send(response)
        })
      } else if (req.query.action as string == "-r") {
        MongoClient.connect(dbURL).then((client) => {
          const db = client.db(dbName);
        const id: number = parseInt( req.query.id as string)
          return db.collection<funkoSchema>(req.query.user as string).findOne({
            id: id 
       
        }).then((result) => {
          if (result == null) {
            response.success = false;
            response.error = "El funko no existe en la lista"
            res.send(response)
            
          } else {
            response.success = true;
            response.funkoPops = [result]
            res.send(response)
          }
            });
          }).catch((error) => {
          console.log(error);
        });;
      }
    } else {
      response.success = false;
      response.error = "Please, introduce a user";
      res.send(response);
    }
  } else {
    response.success = false;
    response.error = "Please, introduce a command";
    res.send(response);
  }
});

/**
 * Funcion que crea añade un nuevo funko a la lista de un usuario
 */
app.post("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
  const funko: funkoSchema = {
    id: parseInt(req.query.id as string),
    name: req.query.name as string,
    description: req.query.description as string,
    type: req.query.type as type,
    genre: req.query.genre as genre,
    franchise: req.query.franchise as string,
    number: parseInt(req.query.number as string),
    exclusive: req.query.exclusive as unknown as boolean,
    specialFeatures: req.query.specialFeatures as string,
    marketValue: parseInt(req.query.marketValue as string),
  };
  MongoClient.connect(dbURL).then((client) => {
    const db = client.db(dbName);
  const id: number = parseInt( req.query.id as string)
    return db.collection<funkoSchema>(req.query.user as string).findOne({
      id: id 
 
  }).then((result) => {
    if (result == null) {
      MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<funkoSchema>(req.query.user as string).insertOne(funko);
         }).then((result) => {
          response.success = true;
          response.funkoPops = [funko]
          res.send(response)
           })
      
    } else {
      response.success = false;
      response.error = "El funko ya existe en la lista"
      res.send(response)
    }
      });
    }).catch((error) => {
    console.log(error);
  });;
});

/**
 * Funcion que elimina un funko de la lista de un usuario
 */
app.delete("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
  MongoClient.connect(dbURL).then((client) => {
    const db = client.db(dbName);
    const id: number = parseInt(req.query.id as string)
    return db.collection<funkoSchema>(req.query.user as string).findOne({
      id: id
 
  }).then((result) => {
    if (result == null) {
      response.success = false;
      response.error = "El funko no existe en la lista"
      res.send(response)
      
      
    } else {
      MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<funkoSchema>(req.query.user as string).deleteOne({
          id: id
        }).then((result) => {
          response.success = true;
          res.send(response)
        })
      
    })
      };
    })
}).catch((error) => {
  console.log(error);
});
});

/**
 * Funcion que modifica un funko de la lista de un usuario
 */
app.patch("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
 
  MongoClient.connect(dbURL).then((client) => {
    const db = client.db(dbName);
  const id: number = parseInt( req.query.id as string)
    return db.collection<funkoSchema>(req.query.user as string).findOne({
      id: id 
 
  }).then((result) => {
    if (result == null) {
      response.success = false;
      response.error = "El funko no existe en la lista"
      res.send(response)
      
    } else {
      MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<funkoSchema>(req.query.user as string).updateOne({
          _id: new ObjectId(result._id),
        }, {
          $set: {
            id: parseInt(req.query.id as string),
    name: req.query.name as string,
    description: req.query.description as string,
    type: req.query.type as type,
    genre: req.query.genre as genre,
    franchise: req.query.franchise as string,
    number: parseInt(req.query.number as string),
    exclusive: req.query.exclusive as unknown as boolean,
    specialFeatures: req.query.specialFeatures as string,
    marketValue: parseInt(req.query.marketValue as string),
          },
        });
      }).then((result) => {
        response.success = true;
        res.send(response)
      }).catch((error) => {
        console.log(error);
      });
     
    }
      });
    }).catch((error) => {
    console.log(error);
  });;
 
});


/**
 * Funcion que escucha los mensajes que llegan al servidor
 */
export const server = app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

/**
 * Solicitud para apagar el servidor (Testeo)
 */
app.post('/off', (req,res) => {
  console.log('Deteniendo servidor');
  res.send({statusCode: 200, message: 'Servidor detenido'});
  server.close(() => {
    console.log('Servidor detenido');
    process.exit(0);
  });
});
/**
 * Devuelve un mensaje de error si la direccion no es correcta
 */
 app.get("/*", (req, res) => {
  const response: ResponseType = {
    success: false,
    error: "Bad address",
  };
  res.send(response);
});
app.post('/*', (_req,res) => {
  const response: ResponseType = {
    success: false,
    error: "Bad address",
  };
  res.send(response);
});
app.delete('/*', (_req,res) => {
  const response: ResponseType = {
    success: false,
    error: "Bad address",
  };
  res.send(response);
});
app.patch('/*', (_req,res) => {
  const response: ResponseType = {
    success: false,
    error: "Bad address",
  };
  res.send(response);
});




