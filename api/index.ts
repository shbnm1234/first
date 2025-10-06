import express, { Request, Response } from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let isInitialized = false;

export default async function handler(req: Request, res: Response) {
  if (!isInitialized) {
    try {
      await registerRoutes(app);
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize routes:', error);
      return res.status(500).json({ error: 'Server initialization failed' });
    }
  }
  
  app(req as any, res as any);
}