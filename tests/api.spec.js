// @ts-check
import { test, expect } from '@playwright/test';
import { adminData, bookingData, updatedData } from '../data/testData';

let baseURL;
let bookingId;
let token;

test.describe('API tests for Restful-Booker', () => {
  // === Setup before all tests: create booking and get auth token ===
  test.beforeAll(async ({ request }) => {
    baseURL = 'https://restful-booker.herokuapp.com';

    const response = await request.post(`${baseURL}/booking`, { data: bookingData });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');

    bookingId = body.bookingid;
    expect(body.booking).toMatchObject(bookingData);

    const responseToken = await request.post(`${baseURL}/auth`, { data: adminData });
    token = (await responseToken.json()).token;
  });

  test('GET: retrieve the created booking and verify data', async ({ request }) => {
    const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseGet.status()).toBe(200);

    const bodyGet = await responseGet.json();
    expect(bodyGet).toMatchObject(bookingData);
  });

  test('PUT: update booking data correctly', async ({ request }) => {
    const config = { headers: { Cookie: `token=${token}` } };

    const responsePut = await request.put(`${baseURL}/booking/${bookingId}`, { data: updatedData, ...config });
    expect(responsePut.status()).toBe(200);

    const bodyPut = await responsePut.json();
    expect(bodyPut.firstname).toBe('Eugene');
    expect(bodyPut.lastname).toBe('Krabs');
    expect(bodyPut.totalprice).toBe(0);
  });

  // === Cleanup after all tests: DELETE booking ===
  test.afterAll(async ({ request }) => {
    const responseDelete = await request.delete(`${baseURL}/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });
    expect(responseDelete.status()).toBe(201);

    const resAfterDelete = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(resAfterDelete.status()).toBe(404);
  });
});
