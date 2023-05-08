import * as fs from "fs";
import { compruebaUsuario } from "./compruebaUsuario.js";

/**
 * Funcion que lee un fichero, primero comprueba que el usuario existe
 * @param user ID del usuario
 * @param cb Callback
 */
export const readFiles = (
  user: string,
  cb: (err: string | undefined, data: string | undefined) => void
) => {
  compruebaUsuario(user, (err) => {
    if (err) {
      cb(err, undefined);
    } else {
      const path = `src/funko/users/${user}/funko-list.json`;
      fs.readFile(path, (err, data) => {
        if (err) {
          cb(`Error reading notes file: ${err.message}`, undefined);
        } else {
          cb(undefined, data.toString());
        }
      });
    }
  });
};
