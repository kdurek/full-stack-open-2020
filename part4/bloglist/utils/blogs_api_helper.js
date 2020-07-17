const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "my first blog",
    author: "dare",
    url: "https://testing.com/howto",
    likes: 66,
  },
  {
    title: "break it",
    author: "Deyon",
    url: "https://breaking.com/downit",
    likes: 11,
  },
  {
    title: "async/await is the easy",
    author: "Tutek",
    url: "https://asyncly.com",
    likes: 116,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
