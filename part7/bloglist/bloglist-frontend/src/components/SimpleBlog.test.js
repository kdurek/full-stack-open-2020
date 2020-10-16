import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

describe("SimpleBlog", () => {
  let component;
  let mockHandler;
  const testBlog = {
    title: "test title",
    author: "test author",
    likes: 23,
    url: "https://test.url/",
  };
  const handleClick = () => console.log("blog liked!");
  // const testUser = { name: "Test user", username: "testuser" };

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(<SimpleBlog blog={testBlog} onClick={mockHandler} />);
  });

  test("renders title and author", () => {
    const div = component.container.querySelector(".title-author");
    expect(div).toHaveTextContent("test title");
    expect(div).toHaveTextContent("test author");
  });

  test("renders the likes", () => {
    const div = component.container.querySelector(".likes");
    expect(div).toHaveTextContent("blog has 23 likes");
  });

  test("clicking the button calls event handler twice", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
