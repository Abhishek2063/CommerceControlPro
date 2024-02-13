// helpers/responseHelper.js

/**
 * Send response to client.
 * @param {Object} NextResponse - Next.js server response utility.
 * @param {number} statusCode - HTTP status code.
 * @param {boolean} success - Indicates whether the operation was successful.
 * @param {string} message - Message to be included in the response.
 * @param {Object|null} data - Additional data to be included in the response (optional).
 * @returns {Object} - JSON response object.
 */
const sendResponse = (
  NextResponse,
  statusCode,
  success,
  message,
  data = null
) => {
  // Construct response object
  const response = {
    statusCode,
    success,
    message,
    data,
  };

  // Return JSON response
  return NextResponse.json(response);
};

// Export sendResponse function
module.exports = { sendResponse };
