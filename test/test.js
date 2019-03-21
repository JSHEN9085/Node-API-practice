const request = require("request");
const assert = require('assert');
const port = process.env.PORT || 3000;

var server_url = `http://localhost:${port}/`


describe("Connect to product table", function() {
  it("returns status code 200", function(done) {
    request.get(`${server_url}products`, function(error, response, body) {
      //expect(response.statusCode).toBe(200);
      assert.equal(200, response.statusCode);
      done();
    });
  });
})
