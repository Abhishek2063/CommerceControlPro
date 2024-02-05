// helpers/responseHelper.js

const sendResponse = (
  NextResponse,
  statusCode,
  success,
  message,
  data = null
) => {
  const response = {
    statusCode,
    success,
    message,
    data,
  };

  return NextResponse.json(response);
};

module.exports = { sendResponse };
