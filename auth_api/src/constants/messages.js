module.exports = {
  AUTHENTICATION_FAILED: {
    code: 400,
    success: false,
    error: 'Authentication failed. Please login with valid credentials.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    success: false,
    error: 'Something unexpected happened',
  },
  UNAUTHORIZED: {
    code: 401,
    success: false,
    error: 'Your session has expired. Please login again',
  },
  NOT_FOUND: {
    code: 404,
    success: false,
    error: 'Requested API not found',
  },
  BAD_REQUEST: {
    code: 400,
    error: 'Bad request. Please try again with valid parameters',
    success: false,
  },
  CONFLICT: {
    code: 409,
    error: 'Bad request. Please try again with valid parameters',
    success: false,
  },
  SUCCESSFUL_CREATED: {
    code: 201,
    success: true,
  },
  SUCCESSFUL: {
    code: 200,
    success: true,
  },
};
