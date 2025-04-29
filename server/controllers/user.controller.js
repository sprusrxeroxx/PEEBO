import User from "../models/user.model.js";

// Create or update a user
export const syncUser = async (req, res) => {
  try {
    const { firebaseId, email, displayName, profilePhoto } = req.body;
    
    if (!firebaseId || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "Firebase ID and email are required" 
      });
    }
    
    // Find and update the user, or create if they don't exist
    const user = await User.findOneAndUpdate(
      { firebaseId },
      { firebaseId, email, displayName, profilePhoto },
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      message: "User synced successfully",
      data: user
    });
  } catch (error) {
    console.error("Error syncing user:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to sync user" 
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { firebaseId } = req.params;
    
    if (!firebaseId) {
      return res.status(400).json({ 
        success: false, 
        message: "Firebase ID is required" 
      });
    }
    
    const user = await User.findOne({ firebaseId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch user" 
    });
  }
};