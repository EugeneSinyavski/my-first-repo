// @ts-check
import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
  const baseURL = 'https://restful-booker.herokuapp.com';

  test('API tests for Restful-Booker', async ({ request }) => {
    const bookingData = {
      firstname: 'SpongeBob',
      lastname: 'SquarePantsu',
      totalprice: 99999,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-09-15',
        checkout: '2026-09-14',
      },
      additionalneeds: [
        'Extra bubbles',
        'A Krabby Patty',
        'Jellyfishing net',
        'Snail food for Gary',
      ],
    };

    // ==== POST ====
    // Create a new booking and verify response
    const response = await request.post(`${baseURL}/booking`, { data: bookingData });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');

    const bookingId = body.bookingid;
    expect(body.booking).toMatchObject(bookingData);

    // ==== GET ====
    // Retrieve the created booking and verify data
    const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseGet.status()).toBe(200);

    const bodyGet = await responseGet.json();
    expect(bodyGet).toMatchObject(bookingData);

    const adminData = {
      username: 'admin',
      password: 'password123',
    };

    // ==== PUT ====
    // Update booking data and verify response
    const responseToken = await request.post(`${baseURL}/auth`, { data: adminData });
    const { token } = await responseToken.json();

    bookingData.firstname = 'Eugene';
    bookingData.lastname = 'Krabs';
    bookingData.totalprice = 0;

    const config = {
      headers: {
        Cookie: `token=${token}`,
      },
    };

    const responsePut = await request.put(`${baseURL}/booking/${bookingId}`, { data: bookingData, ...config });
    expect(responsePut.status()).toBe(200);

    const bodyPut = await responsePut.json();
    expect(bodyPut.firstname).toBe('Eugene');
    expect(bodyPut.lastname).toBe('Krabs');
    expect(bodyPut.totalprice).toBe(0);

    // ==== DELETE ====
    // Delete the booking and verify it no longer exists
    const responseDelete = await request.delete(`${baseURL}/booking/${bookingId}`, { ...config });
    expect(responseDelete.status()).toBe(201);

    const resAfterDelete = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(resAfterDelete.status()).toBe(404);
  });
});
