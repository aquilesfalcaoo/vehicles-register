import req from 'supertest';
import index from '../src';

test('[GET] /', async () => {
  const res = await req(index).get('/');
  expect(res.text).toBe('Application works!');
});
