import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'node:http';
import { config } from './config/env.js';

const app = express();
const server = createServer(app);

// ── Middleware ──────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// ── Health Check ───────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'medtriage-gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/ready', (_req, res) => {
  // TODO: Check PostgreSQL + Redis connectivity
  res.json({ status: 'ready' });
});

// ── API Routes (mounted in later phases) ───────────
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/sessions', sessionsRouter);
// app.use('/api/v1/consultations', consultationsRouter);
// app.use('/api/v1/drugs', drugsRouter);
// app.use('/api/v1/prescriptions', prescriptionsRouter);
// app.use('/api/v1/ai-callback', aiCallbackRouter);

// ── Global Error Handler ───────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Gateway Error]', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.isDev ? err.message : undefined,
  });
});

// ── Start Server ───────────────────────────────────
server.listen(config.port, () => {
  console.log(`\n🏥 MedTriage Gateway running on http://localhost:${config.port}`);
  console.log(`   Environment: ${config.nodeEnv}`);
  console.log(`   Health:      http://localhost:${config.port}/health\n`);
});

export { app, server };
