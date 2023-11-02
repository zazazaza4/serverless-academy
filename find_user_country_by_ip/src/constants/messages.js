module.exports = {
  INTERNAL_SERVER_ERROR: {
    code: 500,
    success: false,
    error: 'Something unexpected happened',
  },
  BAD_REQUEST: {
    code: 400,
    error: 'Bad request. Please try again with valid parameters',
    success: false,
  },
  SUCCESSFUL: {
    code: 200,
    success: true,
  },
};
