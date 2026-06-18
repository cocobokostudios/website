const MAILERLITE_SUBSCRIBERS_URL = 'https://connect.mailerlite.com/api/subscribers';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  success: 'Thanks! Please check your inbox to confirm your subscription.',
  invalid: 'Please enter a valid email address.',
  method: 'Please submit the newsletter form to subscribe.',
  unavailable: 'Sorry, we could not subscribe you right now. Please try again later.',
};

function json(status, body, headers = {}) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    jsonBody: body,
  };
}

function createMailerLitePayload(email, groupId) {
  const payload = { email };

  if (groupId) {
    payload.groups = [groupId];
  }

  return payload;
}

export function createNewsletterHandler({
  env = process.env,
  fetchImpl = globalThis.fetch,
} = {}) {
  return async function handleNewsletterSubscribe(request, context = {}) {
    if (request.method?.toUpperCase() !== 'POST') {
      return json(405, { status: 'validation_error', message: messages.method }, { Allow: 'POST' });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(400, { status: 'validation_error', message: messages.invalid });
    }

    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || !EMAIL_PATTERN.test(email)) {
      return json(400, { status: 'validation_error', message: messages.invalid });
    }

    if (!env.MAILERLITE_API_KEY) {
      context.error?.('Newsletter subscription is unavailable because MailerLite is not configured.');
      return json(500, { status: 'system_error', message: messages.unavailable });
    }

    try {
      const response = await fetchImpl(MAILERLITE_SUBSCRIBERS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(createMailerLitePayload(email, env.MAILERLITE_GROUP_ID)),
      });

      if (!response.ok) {
        context.error?.('MailerLite subscriber request failed.', {
          status: response.status,
        });
        return json(502, { status: 'system_error', message: messages.unavailable });
      }

      return json(200, { status: 'success', message: messages.success });
    } catch {
      context.error?.('MailerLite subscriber request could not be completed.');
      return json(502, { status: 'system_error', message: messages.unavailable });
    }
  };
}

export const handleNewsletterSubscribe = createNewsletterHandler();
