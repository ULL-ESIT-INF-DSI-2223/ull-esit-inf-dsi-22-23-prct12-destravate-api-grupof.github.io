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
      } else {
        readFiles(req.query.user as string, (err, data) => {
          if (err) {
            response.success = false;
            response.error = err;
            res.send(response);
          } else {
            const funkolist: funkoSchema[] = JSON.parse(data as string);
            listRead(
              funkolist,
              req.query.action as string,
              (err, data) => {
                if (err) {
                  response.success = false;
                  response.error = err;
                  res.send(response);
                } else {
                  response.success = true;
                  response.funkoPops = data;
                  res.send(response);
                }
              },
              parseInt(req.query.id as string)
            );
          }
        });
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
  readFiles(req.query.user as string, (err, data) => {
    if (err) {
      response.success = false;
      response.error = err;
      res.send(response);
    } else {
      const funkolist: funkoSchema[] = JSON.parse(data as string);

      if (
        req.query.id === "" ||
        req.query.name === "" ||
        req.query.description === "" ||
        req.query.type === "" ||
        req.query.genre === "" ||
        req.query.franchise === "" ||
        req.query.number === "" ||
        req.query.exclusive === "" ||
        req.query.specialFeatures === "" ||
        req.query.marketValue === ""
      ) {
        response.success = false;
        response.error = "Bad request";
        res.send(response);
      } else {
        //Comprobar que el id no existe
        const funkofilter = funkolist.filter(
          (funko) => funko.id === parseInt(req.query.id as string)
        );
        if (funkofilter.length > 0) {
          response.success = false;
          response.error = "El id ya existe";
          res.send(response);
        } else {
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

          funkolist.push(funko);
          writeFiles(
            req.query.user as string,
            JSON.stringify(funkolist),
            (err) => {
              if (err) {
                response.success = false;
                response.error = err;
                res.send(response);
              } else {
                response.success = true;
                response.funkoPops = [funko];
                res.send(response);
              }
            }
          );
        }
      }
    }
  });
});
/**
 * Funcion que elimina un funko de la lista de un usuario
 */
app.delete("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
  readFiles(req.query.user as string, (err, data) => {
    if (err) {
      response.success = false;
      response.error = err;
      res.send(response);
    } else {
      const funkolist: funkoSchema[] = JSON.parse(data as string);
      if (req.query.id === "" || req.query.id === undefined) {
        response.success = false;
        response.error = "Fallo en el dato id";
        res.send(response);
      } else {
        const funkofilter = funkolist.filter(
          (funko) => funko.id === parseInt(req.query.id as string)
        );
        if (funkofilter.length > 0) {
          const funkolistnew = funkolist.filter(
            (funko) => funko.id !== parseInt(req.query.id as string)
          );
          writeFiles(
            req.query.user as string,
            JSON.stringify(funkolistnew),
            (err) => {
              if (err) {
                response.success = false;
                response.error = err;
                res.send(response);
              } else {
                response.success = true;
                res.send(response);
              }
            }
          );
        } else {
          response.success = false;
          response.error =
            "No se ha encontrado el funko con id " + req.query.id;
          res.send(response);
        }
      }
    }
  });
});

/**
 * Funcion que modifica un funko de la lista de un usuario
 */
app.patch("/funko", (req, res) => {
  const response: ResponseType = {
    success: false,
  };
  readFiles(req.query.user as string, (err, data) => {
    if (err) {
      response.success = false;
      response.error = err;
      res.send(response);
    } else {
      let funkolist: funkoSchema[] = JSON.parse(data as string);
      if (
        req.query.id === "" ||
        req.query.name === "" ||
        req.query.description === "" ||
        req.query.type === "" ||
        req.query.genre === "" ||
        req.query.franchise === "" ||
        req.query.number === "" ||
        req.query.exclusive === "" ||
        req.query.specialFeatures === "" ||
        req.query.marketValue === ""
      ) {
        response.success = false;
        response.error = "Bad request";
        res.send(response);
      } else {
        const funkofilter = funkolist.filter(
          (funko) => funko.id === parseInt(req.query.id as string)
        );
        if (funkofilter.length == 0) {
          response.success = false;
          response.error = "El id no existe";
          res.send(response);
        } else {
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
          funkolist = funkolist.filter(
            (funko) => funko.id !== parseInt(req.query.id as string)
          );
          funkolist.push(funko);
          writeFiles(
            req.query.user as string,
            JSON.stringify(funkolist),
            (err) => {
              if (err) {
                response.success = false;
                response.error = err;
                res.send(response);
              } else {
                response.success = true;
                response.funkoPops = [funko];
                res.send(response);
              }
            }
          );
        }
      }
    }
  });
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




