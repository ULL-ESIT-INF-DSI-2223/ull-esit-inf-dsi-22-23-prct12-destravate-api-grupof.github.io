import * as fs from "fs";
import { compruebaUsuario } from "./compruebaUsuario.js";

/**
 * Funcion que crea un usuario
 * Si el usuario ya existe devuelve un error
 * @param user ID del usuario
 * @param cb Callback
 */
export const createUser = (
  user: string,
  cb: (err: string | undefined) => void
) => {
  compruebaUsuario(user, (err) => {
    if (err) {
      fs.mkdir(`src/funko/users/${user}`, { recursive: true }, (err) => {
        if (err) {
          cb(`Error creating user folder: ${err.message}`);
        } else {
          fs.writeFile(
            `src/funko/users/${user}/funko-list.json`,
            "[]",
            (err) => {
              if (err) {
                cb(`Error creating user file: ${err.message}`);
              } else {
                cb(undefined);
              }
            }
          );
        }
      });
    } else {
      cb("El usuario con ese nombre ya existe, por favor elige otro");
    }
  });
};
