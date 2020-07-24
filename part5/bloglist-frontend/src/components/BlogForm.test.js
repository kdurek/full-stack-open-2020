import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("BlogForm", () => {
  let component;
  let handleCreateBlog;
  const testBlog = {
    title: "test title",
    author: "test author",
    url: "https://test.url/",
  };

  beforeEach(() => {
    handleCreateBlog = jest.fn();
    component = render(<BlogForm handleCreateBlog={handleCreateBlog} />);
  });

  afterEach(() => {
    cleanup();
  });

  test("correctly calls the handler prop on submit", () => {
    const form = component.container.querySelector("form");
    const titleInput = component.container.querySelector("#blogform__title");
    const authorInput = component.container.querySelector("#blogform__author");
    const urlInput = component.container.querySelector("#blogform__url");

    fireEvent.change(titleInput, {
      target: {
        value: testBlog.title,
      },
    });
    fireEvent.change(authorInput, {
      target: {
        value: testBlog.author,
      },
    });
    fireEvent.change(urlInput, {
      target: {
        value: testBlog.url,
      },
    });

    fireEvent.submit(form);

    expect(handleCreateBlog).toHaveBeenCalledWith(testBlog);
  });
});
