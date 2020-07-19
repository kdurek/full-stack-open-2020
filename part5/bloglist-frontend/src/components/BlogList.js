import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
