const request = require('supertest');
const app = require('./server/server.js');

describe("Test the root path", () => {
  it("It should response the GET method", async () => {
    var response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it('GET /qa/questions should response with status code 200 ', async () => {
    const res = await request(app)
      .get('/qa/questions?product_id=71699')
      expect(res.status).toEqual(200);
  });

  it('GET /qa/questions should response with 4 questions associated with product_id 71698', async () => {
    const res = await request(app)
      .get('/qa/questions?product_id=71698')
      console.log('test',res.body)
      expect(res.body.results.length).toEqual(4);
  });
});

