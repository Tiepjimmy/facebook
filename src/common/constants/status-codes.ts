export const STATUS_CODES = {
  SUCCESS: '00',
  BAD_REQUEST: '400',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  CONFLICT: '405',
  INTERNAL_SERVER_ERROR: '99',
} as const;

export const STATUS_MESSAGES = {
  [STATUS_CODES.SUCCESS]: 'Success',
  [STATUS_CODES.BAD_REQUEST]: 'Bad request',
  [STATUS_CODES.UNAUTHORIZED]: 'Unauthorized',
  [STATUS_CODES.FORBIDDEN]: 'Forbidden',
  [STATUS_CODES.NOT_FOUND]: 'Not found',
  [STATUS_CODES.CONFLICT]: 'Conflict',
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Internal server error',
} as const;
