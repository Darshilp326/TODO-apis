const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create task Schema & model
const CategorySchema = new Schema({
    created_by:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    name: {
        type:String     
    },
    created_on:{
        type:Date,
        default:Date.now

    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;