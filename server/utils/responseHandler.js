/**
 * Utility to standardize successful API responses
 */
export const sendSuccess = (res, data = null, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Utility to standardize error API responses
 */
export const sendError = (res, message = "An error occurred", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};