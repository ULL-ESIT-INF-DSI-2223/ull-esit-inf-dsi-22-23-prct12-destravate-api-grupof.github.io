import { funkoSchema } from "../schema/funkoSchema.js";

export const listRead = (
  funkos: funkoSchema[],
  option: string,
  cb: (error: string | undefined, data: funkoSchema[] | undefined) => void,
  id?: number
) => {
  if (option === "-l") {
    cb(undefined, funkos);
  } else if (option === "-r") {
    if (id !== undefined && !isNaN(id) && id !== null) {
      const funkoFilter = funkos.filter((funko) => funko.id === id);
      if (funkoFilter.length > 0) {
        cb(undefined, funkoFilter);
      } else {
        cb("No se ha encontrado el funko con id " + id, undefined);
      }
    } else {
      cb("No ha especificado un id válido", undefined);
    }
  } else {
    cb("Bad command", undefined);
  }
};
