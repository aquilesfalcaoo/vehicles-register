import { Response } from 'express';

export function handleError(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(500).json({ message: `Internal server error: ${error.message}` });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
}
