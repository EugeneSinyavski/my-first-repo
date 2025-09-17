// @ts-check
import { test, expect } from '@playwright/test';
import { adminData, bookingData, updatedData } from '../data/testData';

test.describe(
  'API tests for Restful-Booker',
  {
    tag: '@api',
  },
  () => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingId;
    let token;

    // === Setup before all tests: create booking and get auth token ===
    test.beforeAll(async ({ request }) => {
      const response = await request.post(`${baseURL}/booking`, { data: bookingData });
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('bookingid');

      bookingId = body.bookingid;
      expect(body.booking).toMatchObject(bookingData);

      const responseToken = await request.post(`${baseURL}/auth`, { data: adminData });
      token = (await responseToken.json()).token;
    });

    test('GET /booking/{id} - should retrieve created booking', async ({ request }) => {
      const response = await request.get(`${baseURL}/booking/${bookingId}`);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toMatchObject(bookingData);
    });

    test('PUT /booking/{id} - should update booking data', async ({ request }) => {
      const config = { headers: { Cookie: `token=${token}` } };

      const response = await request.put(`${baseURL}/booking/${bookingId}`, {
        data: updatedData,
        ...config,
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.firstname).toBe(updatedData.firstname);
      expect(body.lastname).toBe(updatedData.lastname);
      expect(body.totalprice).toBe(updatedData.totalprice);
      expect(body).toMatchObject(updatedData);
    });

    // === Cleanup after all tests: DELETE booking ===
    test.afterAll(async ({ request }) => {
      const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
      });
      expect(response.status()).toBe(201);

      const resAfterDelete = await request.get(`${baseURL}/booking/${bookingId}`);
      expect(resAfterDelete.status()).toBe(404);
    });
  }
);
