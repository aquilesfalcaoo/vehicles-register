import { Response } from 'express';
import { handleError } from '../../utils/handleError';

describe('handleError', () => {
  it('returns a 500 response with the error message when the error is an Error instance', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    handleError(res, new Error('boom'));

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error: boom' });
  });

  it('returns a generic 500 response when the error is not an Error instance', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    handleError(res, 'boom');

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
