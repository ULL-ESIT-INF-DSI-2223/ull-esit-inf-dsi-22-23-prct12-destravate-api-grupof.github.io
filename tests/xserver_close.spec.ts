import { expect } from "chai";
import "mocha";
import * as http from "http";
import { server } from "../src/funko/server/server.js";
const servidor = server;
const options4 = {
    hostname: "localhost",
    port: 3000,
    path: "/off",
    method: "POST",
  };
describe ("Servidor", () => {

it("Cerrando servidor", (done) => {
    const req = http.request(options4, (res) => {
      res.on("end", () => {
        console.log(res.statusCode)
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });
    req.end();
  });
});