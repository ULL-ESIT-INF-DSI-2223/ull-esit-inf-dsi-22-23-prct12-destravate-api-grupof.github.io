import * as fs from "fs";

/**
 * Funcion que escribe un fichero
 * @param user ID del usuario
 * @param data Datos a escribir
 * @param cb Callback
 */
export const writeFiles = (
  user: string,
  data: string,
  cb: (err: string | undefined) => void
) => {
  fs.writeFile(`src/funko/users/${user}/funko-list.json`, data, (err) => {
    if (err) {
      cb(`Error writing notes file: ${err.message}`);
    } else {
      cb(undefined);
    }
  });
};
