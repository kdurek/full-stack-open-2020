const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String },
  url: { type: String },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

if (process.env.NODE_ENV === "test") {
  const Blog = mongoose.model("Blog", blogSchema, "blogs-test");
  module.exports = Blog;
} else {
  const Blog = mongoose.model("Blog", blogSchema, "blogs");
  module.exports = Blog;
}
