// @ts-check
import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
  const baseURL = 'https://restful-booker.herokuapp.com';

  test('should create a booking using POST', async ({ request }) => {
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

    // Send POST request to create a new booking
    const response = await request.post(`${baseURL}/booking`, { data: bookingData });

    // Verify the response status is 200 OK
    expect(response.status()).toBe(200);

    // Verify that response contains bookingid field
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    const bookingId = body.bookingid;

    // Verify that response contains bookingid field
    expect(body.booking).toMatchObject(bookingData);

    // Send GET request to retrieve the booking
    const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseGet.status()).toBe(200);

    // Verify GET response matches the original booking data
    const bodyGet = await responseGet.json();
    expect(bodyGet).toMatchObject(bookingData);
  });
});
