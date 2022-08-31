const request = require('supertest');
const app = require('./server/server.js');
const pool = require('./server/database/postgres.js').pool;

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
      expect(res.body.results.length).toEqual(4);
  });
});

describe("Test the POST /qa/questions", () => {
  var fakeData = {
    product_id: 71698,
    body: 'Test Question for product id 71698',
    name: 'john doe',
    email: 'jdoe@gmail.com',

  }
  afterEach(async () => {
    await pool.query(`DELETE FROM questions WHERE asker_name = '${fakeData.name}'`);
  });

  it('POST /qa/questions should response with status code 201', async() => {
    const res = await request(app)
      .post('/qa/questions')
      .send(fakeData);
      expect(res.status).toEqual(201);
      //expect(res._data.body).toEqual('Test Question for product id 71698');
  })
})

describe("Test the PUT /qa/answers/:answer_id/helpful", () => {

  it('PUT /qa/answers/6797506/helpful should response with status code 204', async() => {
    const res = await request(app)
      .put('/qa/answers/6797506/helpful')
      expect(res.status).toEqual(204);
      //expect(res._data.body).toEqual('Test Question for product id 71698');
  })
})

describe("Test the PUT /qa/answers/:answer_id/report", () => {

  it('PUT /qa/answers/6797506/report should response with status code 204', async() => {
    const res = await request(app)
      .put('/qa/answers/6797506/report')
      expect(res.status).toEqual(204);
      //expect(res._data.body).toEqual('Test Question for product id 71698');
  })
})

