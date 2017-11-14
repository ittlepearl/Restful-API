// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    deadline : Date,
    completed : Boolean,
    assignedUser : String,
    assignedUserName : {
      type: String,
      default: "unassigned"
    },
    dateCreated : {
      type : Date,
      default: Date.now
    }
});

// compile schema as module and Export the Mongoose model
module.exports = mongoose.model('Tasks', TaskSchema);
