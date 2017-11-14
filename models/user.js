// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    description: String,
    email : String,
    pendingTasks : {
      type : Array,
      default : []
    },
    dateCreated : {
      type : Date,
      default: Date.now
    }
});

// compile schema as module and Export the Mongoose model
module.exports = mongoose.model('Users', UserSchema);
