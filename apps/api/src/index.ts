import express from 'express';
import type { ErrorRequestHandler } from 'express';
import helmet from 'helmet';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

// Every route lives under /api so the URL is the same locally and on Vercel.
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hsse-api', time: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Express renders its own error pages unless we handle errors, so always return JSON.
const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
};
app.use(onError);

// Vercel runs the exported app as a serverless function; locally we listen on a port.
if (!process.env.VERCEL) {
  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
}

export default app;
