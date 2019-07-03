const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const about = "http://localhost:3000/about/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        //console.log(res.statusCode);
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
  describe("GET /about", () => {
    it("should return status code 200", (done) => {
      request.get(about, (err, res, body) => {
        //console.log(res.statusCode);
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});