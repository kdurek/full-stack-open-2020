/* eslint-disable no-underscore-dangle */
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const getTokenFrom = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
  const { body } = request;

  try {
    if (request.body.title === undefined && request.body.url === undefined) {
      response.status(400).end();
    }

    if (!request.token || !request.token.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(request.token.id);

    const blogObject = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blogObject.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { body } = request;

  try {
    const blogObject = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogObject,
      {
        new: true,
      },
    );
    response.status(201).json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    if (!request.token || !request.token.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const blog = await Blog.findById(request.params.id);
    const user = await User.findOne({ username: request.token.username });

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
