const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../utils/blogs_api_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("blogs GET requests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs are returned with id, not _id", async () => {
    const response = await api.get("/api/blogs/");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("blogs POST requests", () => {
  test("creating a blog post", async () => {
    const blogObject = {
      title: "Test Blog",
      author: "Test Blogger",
      url: "https://test.blog",
      likes: 71,
    };

    await api
      .post("/api/blogs")
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((blog) => blog.title);
    expect(contents).toContain("Test Blog");
  });

  test("default likes to zero if no property", async () => {
    const blogObject = {
      title: "Test Missing Likes",
      author: "Test Blogger",
      url: "https://test.blog",
    };

    await api
      .post("/api/blogs")
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blogLikes = blogsAtEnd.map((blog) => blog.likes);
    expect(blogLikes[blogLikes.length - 1]).toBe(0);
  });

  test("if blog lack title or url return 400", async () => {
    const blogObject = {
      _id: "5f115672c455d8298c055a60",
      author: "Test Blogger",
      likes: 71,
      __v: 0,
    };

    await api.post("/api/blogs").send(blogObject).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    const id = blogsAtEnd.map((blog) => blog.id);
    expect(id).not.toContain("5f115672c455d8298c055a60");
  });
});

describe("blogs DELETE requests", () => {
  test("delete post of id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
    const contents = blogsAtEnd.map((blog) => blog.id);
    expect(contents).not.toContain(blogToDelete.id);
  });
});

describe("blogs PUT requests", () => {
  test("succeeds with valid data", async () => {
    const blogObject = {
      title: "Test Missing Likes",
      author: "Test Blogger",
      url: "https://test.blog",
      likes: 256,
    };

    await api
      .post("/api/blogs")
      .send(blogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map((n) => n.likes);
    expect(contents).toContain(blogObject.likes);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
