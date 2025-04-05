const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});



const blogModel = mongoose.model("product", blogSchema, "product"); // Use consistent model name
export {blogModel };



export type blogTask = {
    title: String,
    content: String,
    createdAt: Date, 
    _user: string
    };