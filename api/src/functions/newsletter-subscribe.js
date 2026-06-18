import { app } from '@azure/functions';
import { handleNewsletterSubscribe } from '../newsletter.js';

app.http('newsletter-subscribe', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'newsletter-subscribe',
  handler: handleNewsletterSubscribe,
});
