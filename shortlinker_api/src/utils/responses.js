const { SUCCESSFUL, BAD_REQUEST } = require('../constants/messages');

const serverResponse = {
  sendSuccess: (res, data, message = SUCCESSFUL) => {
    const responseMessage = {
      code: message.code || 200,
      success: true,
      data: {
        ...data,
      },
    };

    return res.status(responseMessage.code).json(responseMessage);
  },
  sendError: (res, message = BAD_REQUEST) => {
    const responseMessage = {
      code: message.code || 400,
      success: false,
      error: message.error,
    };

    return res.status(responseMessage.code).json(responseMessage);
  },
};

module.exports = serverResponse;
