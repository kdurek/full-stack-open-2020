import React, { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notification = (message, type) => {
    setMessageType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleLogin = async (credential) => {
    try {
      const user = await loginService.login(credential);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      notification(`${user.name} logged in`, "confirmation");
    } catch (exception) {
      notification(`Wrong username or password`, "error");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    notification(`${user.name} logged out`, "error");
    setUser(null);
  };

  const handleCreateBlog = async (blog) => {
    if ([blog.title, blog.author, blog.url].some((x) => x === "")) {
      return notification("field can't be empty", "error");
    }

    blogFormRef.current.toggleVisibility();
    const savedBlog = await blogService.create(blog);
    setBlogs(blogs.concat(savedBlog));

    notification(`a new blog ${blog.title} added`, "confirmation");
  };

  const handleLikeBlog = async (event) => {
    event.preventDefault();
    const id = event.target.value;
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      // || blog.user,
    };

    const savedBlog = await blogService.update(id, changedBlog);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : savedBlog)));
  };

  const handleRemoveBlog = async (event) => {
    event.preventDefault();
    const id = event.target.value;
    const blog = blogs.find((n) => n.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((n) => n.id !== id));
      } catch (exception) {
        console.log(exception);
        notification("erorik", "error");
      }
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <BlogList
            blogs={blogs}
            handleLikeBlog={handleLikeBlog}
            handleRemoveBlog={handleRemoveBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
