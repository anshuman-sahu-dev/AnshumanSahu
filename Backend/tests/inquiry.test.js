const request = require('supertest');
const app = require('../src/app');

describe('POST /api/v1/inquiries', () => {
  it('should return 400 Bad Request when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/v1/inquiries')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('should silently drop honeypot submissions with HTTP 200', async () => {
    const res = await request(app)
      .post('/api/v1/inquiries')
      .send({
        inquiryType: 'job',
        name: 'Spam Bot',
        email: 'spambot@example.com',
        company: 'Spam Corp',
        description: 'This is a spam message attempting to abuse the contact form.',
        _gotcha: 'http://spam-link.ru',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.message).toBe('Inquiry received.');
  });
});
