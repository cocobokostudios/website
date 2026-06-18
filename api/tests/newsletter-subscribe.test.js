import test from 'node:test';
import assert from 'node:assert/strict';
import { createNewsletterHandler } from '../src/newsletter.js';

const baseEnv = {
  MAILERLITE_API_KEY: 'secret-key',
  MAILERLITE_GROUP_ID: 'group-123',
};

function request(body, method = 'POST') {
  return {
    method,
    async json() {
      if (body instanceof Error) throw body;
      return body;
    },
  };
}

test('forwards a normalized email and optional group to MailerLite', async () => {
  const calls = [];
  const handler = createNewsletterHandler({
    env: baseEnv,
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return { ok: true, status: 201 };
    },
  });

  const response = await handler(request({ email: ' Fan@Example.com ' }));

  assert.equal(response.status, 200);
  assert.equal(response.jsonBody.status, 'success');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://connect.mailerlite.com/api/subscribers');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer secret-key');
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    email: 'fan@example.com',
    groups: ['group-123'],
  });
});

test('accepts MailerLite upsert responses without requiring a group', async () => {
  const calls = [];
  const handler = createNewsletterHandler({
    env: { MAILERLITE_API_KEY: 'secret-key' },
    fetchImpl: async (_url, options) => {
      calls.push(options);
      return { ok: true, status: 200 };
    },
  });

  const response = await handler(request({ email: 'fan@example.com' }));

  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(calls[0].body), { email: 'fan@example.com' });
});

test('rejects invalid requests without calling MailerLite', async () => {
  let calls = 0;
  const handler = createNewsletterHandler({
    env: baseEnv,
    fetchImpl: async () => {
      calls += 1;
      return { ok: true, status: 201 };
    },
  });

  const invalidEmail = await handler(request({ email: 'not-an-email' }));
  const invalidJson = await handler(request(new Error('invalid JSON')));
  const wrongMethod = await handler(request({}, 'GET'));

  assert.equal(invalidEmail.status, 400);
  assert.equal(invalidJson.status, 400);
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.headers.Allow, 'POST');
  assert.equal(calls, 0);
});

test('returns a generic error when MailerLite is not configured', async () => {
  const errors = [];
  const handler = createNewsletterHandler({ env: {}, fetchImpl: async () => assert.fail('fetch should not run') });

  const response = await handler(request({ email: 'fan@example.com' }), {
    error: (...args) => errors.push(args),
  });

  assert.equal(response.status, 500);
  assert.equal(response.jsonBody.status, 'system_error');
  assert.doesNotMatch(JSON.stringify(response), /secret|fan@example/i);
  assert.equal(errors.length, 1);
});

test('returns a generic error for MailerLite and network failures without logging PII', async () => {
  for (const fetchImpl of [
    async () => ({ ok: false, status: 429 }),
    async () => {
      throw new Error('network unavailable');
    },
  ]) {
    const errors = [];
    const handler = createNewsletterHandler({ env: baseEnv, fetchImpl });
    const response = await handler(request({ email: 'private@example.com' }), {
      error: (...args) => errors.push(args),
    });

    assert.equal(response.status, 502);
    assert.equal(response.jsonBody.status, 'system_error');
    assert.doesNotMatch(JSON.stringify(response), /private@example|secret-key/i);
    assert.doesNotMatch(JSON.stringify(errors), /private@example|secret-key/i);
  }
});
