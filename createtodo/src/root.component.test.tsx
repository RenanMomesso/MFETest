import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Root from "./root.component";

describe("Root", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "list",
      JSON.stringify([
        { id: "1", text: "Test Todo 1", completed: false },
        { id: "2", text: "Test Todo 2", completed: true },
      ])
    );
  });

  it("renders the component", () => {
    render(<Root />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
  });

  it("loads todo items from localStorage", () => {
    render(<Root />);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("adds a new todo item", () => {
    render(<Root />);
    const input = screen.getByPlaceholderText("Add a new todo");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(screen.getByText("Add Todo"));

    expect(screen.getByText("New Todo")).toBeInTheDocument();
    const storageList = localStorage.getItem("list");
    expect(storageList).toContain("New Todo");
    expect(input.value).toBe("");
  });

  it("does not add an empty todo item", () => {
    render(<Root />);
    const input = screen.getByPlaceholderText('Add a new todo');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Add Todo'));

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(2); 

    const storageList = localStorage.getItem('list');
    expect(storageList).not.toContain('null');
  });
});
