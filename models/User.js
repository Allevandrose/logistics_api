const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['client', 'admin', 'agent'], // Updated roles
    default: 'client' 
  },
  phone: { 
    type: String 
  }, // Phone number (optional)
  resetToken: { 
    type: String 
  }, // For password reset functionality
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

// Export the User model
module.exports = mongoose.model('User', userSchema);