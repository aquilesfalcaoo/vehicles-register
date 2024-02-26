import app from "../src/app";
import request from 'supertest';

describe('Tests for the route "/"', () => {
  it(('Should return a status 200 and a correct message'), async () => {
    const res = await request(app).get("/").send("Vehicles Register");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual("Vehicles Register");
  });
});

describe('Tests for the route "/vehicles"', () => {
  it(('Should return a status 200 and a json'), async () => {
    return request(app)
      .get("/vehicles")
      .expect('Content-Type', /json/)
      .expect(200);
  });
});