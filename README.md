# reach-me

A lightweight "contact me" landing page for when I'm off social media. One link for the bio, two ways to reach me: a silent contact form and a WhatsApp handoff. No phone number or email visible in the page source.

**Live site:** _add your Vercel URL here after deploying_

## Why this exists

Took a break from Instagram and Facebook, but still wanted one clean place people could actually reach me. This is that place, built to sit behind a single link in any bio.

## Features

- **Two contact paths** — a message form that delivers silently to my inbox, and a WhatsApp handoff with the message pre-filled
- **Contact details are not exposed in the page source** — the form submits through Formspree, and the WhatsApp number is only decoded at send time
- **Time-aware greeting** — reads the visitor's local device time and greets them accordingly (morning / afternoon / evening / late night)
- **Day and night mode** — defaults to the visitor's system preference, toggleable
- **Smooth, spring-based UI animations** via Framer Motion
- **Fully responsive**, accessible focus states, respects `prefers-reduced-motion`

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Formspree](https://formspree.io/) — serverless form delivery (free tier)
- Plain CSS with custom properties for theming, no CSS framework

## Project structure

```
reach-me/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx        # All UI, state, and logic
    └── App.css        # Theming and styles
```

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Building for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploying (free)

Deployed on [Vercel](https://vercel.com):

1. Push this repo to GitHub
2. Import the repo in Vercel (auto-detects Vite, zero config needed)
3. Deploy — Vercel builds and hosts it, and redeploys automatically on every push

## Configuration

The Formspree endpoint lives in `src/App.jsx`:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
```

Replace it with your own [Formspree](https://formspree.io/) form endpoint if forking this.

## License

MIT — see [LICENSE](./LICENSE).
