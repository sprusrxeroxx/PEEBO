/**
 * Centralized error handling for controllers
 */
export const handleControllerError = (error, res, customMessage = "Server error") => {
  console.error(`Error: ${customMessage}:`, error.message);
  
  // Handle duplicate key errors
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "This item already exists"
    });
  }
  
  return res.status(500).json({
    success: false,
    message: customMessage
  });
};