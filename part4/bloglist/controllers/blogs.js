const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response, next) => {
  const { body } = request;

  if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).end();
  }

  try {
    const blogObject = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });

    const savedBlog = await blogObject.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

// blogsRouter.post("/", async (request, response, next) => {
//   const blog = await new Blog(request.body);

//   if (request.body.title === undefined && request.body.url === undefined) {
//     response.status(400).end();
//   }
//   try {
//     const result = await blog.save();
//     response.status(201).json(result);
//   } catch (exception) {
//     next(exception);
//   }
// });

blogsRouter.put("/:id", async (request, response, next) => {
  const { body } = request;

  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
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
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
