export type Error = {
  code: string;
  path: string;
  message: string;
};

export type ErrorResponse = {
  title: string;
  code: string;
  errors: Error[];
  statusCode: number;
};

export const DEFAULT_ERROR_RESPONSE: ErrorResponse = {
  title: 'There was an error while handling your request.',
  code: 'Thrive.Exception',
  errors: [],
  statusCode: 500,
};

export const UNAUTHORIZED_ERROR_RESPONSE: ErrorResponse = {
  title: 'Unauthorized',
  code: 'Identity.Unauthorized',
  errors: [],
  statusCode: 401,
};

const isApiError = (error: unknown): error is ErrorResponse => {
  return !!(error && typeof error === 'object' && 'code' in error && 'title' in error);
};

export default isApiError;
