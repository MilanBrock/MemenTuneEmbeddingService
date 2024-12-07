import express from 'express';
import client from 'prom-client';

export function setupPrometheus(app: express.Application) {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics(); 

    const httpRequestCounter = new client.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status'], // Labels for detailed tracking
    });

    const httpRequestDurationHistogram = new client.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Histogram of HTTP request durations in seconds',
        labelNames: ['method', 'route', 'status'],
        buckets: [0.1, 0.5, 1, 2, 5], // Define latency buckets
    });

    app.use((req, res, next) => {
        const end = httpRequestDurationHistogram.startTimer(); // Start tracking time
        res.on('finish', () => {
          httpRequestCounter.labels(req.method, req.route?.path || req.path, res.statusCode.toString()).inc(); // Increment request count
          end({ method: req.method, route: req.route?.path || req.path, status: res.statusCode.toString() }); // Record duration
        });
        next();
    });

    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType); // Set content type to text/plain
        res.end(await client.register.metrics()); // Return all metrics
    });

    return app;
}