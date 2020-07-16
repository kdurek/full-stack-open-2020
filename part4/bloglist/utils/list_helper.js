const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes;
  }
  return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favoriteBlog = (blogs) =>
  blogs.reduce((a, b) => {
    return a.likes > b.likes
      ? { title: a.title, author: a.author, likes: a.likes }
      : { title: b.title, author: b.author, likes: b.likes };
  });

const mostBlogs = (blogs) => {
  const sum = {};
  let check = 0;
  let highest;

  blogs.forEach((blog, i) => {
    const { author } = blogs[i];
    if (sum[author] === undefined) {
      sum[author] = 1;
    } else {
      sum[author] += 1;
    }

    if (sum[author] > check) {
      check = sum[author];
      highest = blogs[i];
    }
  });
  return {
    author: highest.author,
    blogs: check,
  };
};

const mostLikes = (blogs) => {
  let totalAuthorLikes = 0;

  const mostPopular = blogs.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });

  blogs.forEach((blog) => {
    blog.author === mostPopular.author ? (totalAuthorLikes += blog.likes) : 0;
  });

  return {
    author: mostPopular.author,
    likes: totalAuthorLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
