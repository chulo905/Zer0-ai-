import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mapsRouter from './routes/maps.js';
import nodesRouter from './routes/nodes.js';
import linksRouter from './routes/links.js';
import aiRouter from './routes/ai.js';
import { initializeDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

initializeDatabase();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptimeSec: process.uptime() });
});

app.use('/api', mapsRouter);
app.use('/api', nodesRouter);
app.use('/api', linksRouter);
app.use('/api', aiRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
