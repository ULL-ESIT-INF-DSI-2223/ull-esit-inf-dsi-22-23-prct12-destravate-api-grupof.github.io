import { expect } from "chai";
import { describe, it } from "mocha";
import { readFiles } from "../src/funko/operations/readFile.js";
import { compruebaUsuario } from "../src/funko/operations/compruebaUsuario.js";
import { createUser } from "../src/funko/operations/createUser.js";
import { writeFiles } from "../src/funko/operations/writeFile.js";
import { readFileSync, writeFileSync, rmSync } from "fs";
import { listRead } from "../src/funko/commands/listReadFunkos.js";
import { type } from "../src/funko/types/type.js";
import { genre } from "../src/funko/types/genre.js";
import { funkoSchema } from "../src/funko/schema/funkoSchema.js";

describe("Comprueba si existe un usuario", () => {
  it("En caso de que si existe", (done) => {
    compruebaUsuario("Test", (err) => {
      expect(err).to.be.undefined;
      done();
    });
  });
  it("En caso de que no existe", (done) => {
    compruebaUsuario("TEST", (err) => {
      expect(err).to.be.string;
      done();
    });
  });
  it("En caso de que no se especifique el usuario", (done) => {
    compruebaUsuario("", (err) => {
      expect(err).to.be.string;
      done();
    });
  });
});

const testContent = readFileSync(
  "src/funko/users/Test/funko-list.json"
).toString();

describe("Leer un fichero", () => {
  it("En caso de que no existe", (done) => {
    readFiles("TEST", (err, data) => {
      expect(err).to.be.string;
      expect(data).to.be.undefined;
      done();
    });
  });
  it("En caso de que si existe", (done) => {
    readFiles("Test", (err, data) => {
      expect(err).to.be.undefined;
      expect(data).to.be.equal(testContent);
      done();
    });
  });
});

describe("Escribir un fichero", () => {
  it("En caso de que no existe", (done) => {
    writeFiles("TEST", testContent, (err) => {
      expect(err).to.be.string;
      done();
    });
  });

  const testsstr =
    testContent.slice(0, -1) +
    ',{"id":100,"name":"Test","description":"Test","type":"POP","genre":"ANIME","franchise":"Test","number":100,"exclusive":true,"specialFeatures":"Test","marketValue":100}]';

  it("En caso de que si existe", (done) => {
    writeFiles("Test", testsstr, (err) => {
      expect(err).to.be.undefined;
      readFiles("Test", (err, data) => {
        expect(err).to.be.undefined;
        expect(data?.toString()).to.be.equal(testsstr);
        writeFileSync("src/funko/users/Test/funko-list.json", testContent);
        done();
      });
    });
  });
});

describe("Crear un usuario", () => {
  it("Crear usuario", (done) => {
    createUser("TEST", (err) => {
      expect(err).to.be.undefined;
      readFiles("TEST", (err, data) => {
        expect(err).to.be.undefined;
        expect(data).to.be.equal("[]");
        done();
        rmSync("src/funko/users/TEST", { recursive: true });
      });
    });
  });
  it("Crear usuario que ya existe", (done) => {
    createUser("Test", (err) => {
      expect(err).to.be.equal(
        "El usuario con ese nombre ya existe, por favor elige otro"
      );
      done();
    });
  });
});

const funkotest: funkoSchema = {
  id: 100,
  name: "Test",
  description: "Test",
  type: type.POP,
  genre: genre.MUSIC,
  franchise: "Test",
  number: 100,
  exclusive: true,
  specialFeatures: "Test",
  marketValue: 100,
};
const funkotest2: funkoSchema = {
  id: 101,
  name: "Test",
  description: "Test",
  type: type.POP,
  genre: genre.MUSIC,
  franchise: "Test",
  number: 100,
  exclusive: true,
  specialFeatures: "Test",
  marketValue: 100,
};
const funkoarray = [funkotest, funkotest2];
describe("Listar y leer funkos", () => {
  it("Listar funkos", (done) => {
    listRead(funkoarray, "-l", (err, data) => {
      expect(err).to.be.undefined;
      expect(data).to.be.deep.equal([funkotest, funkotest2]);
      done();
    });
  });
  it("Leer funkos", (done) => {
    listRead(funkoarray, "-r", (err, data) => {
      expect(err).to.be.equal("No ha especificado un id válido");
      expect(data).to.be.undefined;
      done();
    });
  });
  it("Leer funkos con id", (done) => {
    listRead(
      funkoarray,
      "-r",
      (err, data) => {
        expect(err).to.be.undefined;
        expect(data).to.be.deep.equal([funkotest]);
        done();
      },
      100
    );
  });
  it("Leer funkos con id no existente", (done) => {
    listRead(
      funkoarray,
      "-r",
      (err, data) => {
        expect(err).to.be.equal("No se ha encontrado el funko con id " + 102);
        expect(data).to.be.undefined;
        done();
      },
      102
    );
  });
  it("Poner un comando no válido", (done) => {
    listRead(funkoarray, "-t", (err, data) => {
      expect(err).to.be.equal("Bad command");
      expect(data).to.be.undefined;
      done();
    });
  });
});
