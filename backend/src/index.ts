import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';

const app = express();

// Middleware
app.use(cors({
  origin: ['https://order-app-theta.vercel.app', 'https://frontend-9t85rnpc4-ameys-projects-6447a876.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Export for Vercel
export default app;

// Development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Menu API available at http://localhost:${PORT}/api/menu`);
  });
}
