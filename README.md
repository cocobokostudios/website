# website
The Cocoboko Studios website

Built with Eleventy, WebC, and Tailwind CSS.

## Newsletter API

The newsletter form posts to the managed Azure Static Web Apps Function at
`/api/newsletter-subscribe`. Configure these application settings in Azure:

- `MAILERLITE_API_KEY` (required): a MailerLite API token.
- `MAILERLITE_GROUP_ID` (optional): the group that new subscribers should join.

The API forwards subscriptions directly to MailerLite and does not persist email
addresses in Azure.

# Credits

- Photo for Charter by <a href="https://unsplash.com/@markolsen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mark Olsen</a> on <a href="https://unsplash.com/photos/gray-airplane-flying-during-daytime-K5j1KgecVC8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
