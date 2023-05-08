import * as http from "http";
import { server } from "../src/funko/server/server.js";
import { expect } from "chai";
import "mocha";
import { rmSync } from "fs";

const servidor = server;
/**
 * Peticion Listar funkos del usuario test
 */
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/funko?user=Test&action=-l",
  method: "GET",
};
/**
 * Peticion Leer funko del usuario test devuelve error
 */
const options2 = {
  hostname: "localhost",
  port: 3000,
  path: "/funko?user=Test&action=-r",
  method: "GET",
};
/**
 * Peticion Leer funko del usuario test devuelve funko
 */
const options3 = {
  hostname: "localhost",
  port: 3000,
  path: `/funko?user=Test&action=-r&id=5`,
  method: "GET",
};
/**
 * Peticion apagar servidor
 */

/**
 * Crear usuario
 */
const options5 = {
  hostname: "localhost",
  port: 3000,
  path: `/funko?user=TEST&action=-c`,
  method: "GET",
};
/**
 * Peticion Listar funkos de un usuario que no existe
 */
const options6 = {
  hostname: "localhost",
  port: 3000,
  path: `/funko?user=TEST&action=-l`,
  method: "GET",
};
/**
 * Peticion Listar funkos sin especificar usuario
 */
const options7 = {
  hostname: "localhost",
  port: 3000,
  path: `/funko?user&action=-l`,
  method: "GET",
};
/**
 * Peticion Listar funkos sin especificar accion(-l, -r, -c)
 */
const options8 = {
  hostname: "localhost",
  port: 3000,
  path: `/funko?user=Test&action`,
  method: "GET",
};

describe("Listar/Leer funkos", () => {
  it("Listar funkos de un usuario", (done) => {
    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(true);
        done();
      })
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  });
  it("Buscar un funko", (done) => {
    const req = http.request(options3, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(true);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  it("Buscar un funko pero no especificar id", (done) => {
    const req = http.request(options2, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(false);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  });
  it("Crear un usuario", (done) => {
    const req = http.request(options5, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(true);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  it("Crear un usuario ya existente", (done) => {
    const req = http.request(options5, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(false);
        done();
        rmSync("src/funko/users/TEST", { recursive: true });
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  it("Listar funkos de un usuario que no existe", (done) => {
    const req = http.request(options6, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(false);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  it("Listar funkos sin especificar usuario", (done) => {
    const req = http.request(options7, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(false);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  it("Listar funkos sin especificar comando(-l, -c, -r)", (done) => {
    const req = http.request(options8, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        expect(result.success).to.be.equal(false);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
  /*it("Cerrando servidor", (done) => {
    const req = http.request(options4, (res) => {
      res.on("end", () => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });*/
});
