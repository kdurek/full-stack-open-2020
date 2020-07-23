import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, handleLikeBlog, handleRemoveBlog }) => {
  return (
    <div>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeBlog={handleLikeBlog}
              handleRemoveBlog={handleRemoveBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
