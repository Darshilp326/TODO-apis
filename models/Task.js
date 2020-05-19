const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create task Schema & model
const TaskSchema = new Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId, ref:'User',     
    },
    tasks: [{    
        name:String,  
        createdOn: {type:Date},
        deadline: String
        }]
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;