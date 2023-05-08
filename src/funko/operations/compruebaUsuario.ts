import * as fs from "fs";

/**
 * Funcion que comprueba si existe un usuario
 * Si no existe devuelve un error
 * Si existe devuelve undefined
 * @param user ID del usuario
 * @param cb Callback
 */
export const compruebaUsuario = (
  user: string,
  cb: (err: string | undefined) => void
) => {
  fs.access(`src/funko/users/${user}/funko-list.json`, (err) => {
    if (err) {
      if (user === undefined || user === "") {
        cb("Error, no se ha especificado el usuario");
      } else {
        cb(
          "Error, el usuario " + user +" no existe, para crearlo use GET con el parametro -c"
        );
      }
    } else {
      cb(undefined);
    }
  });
};
