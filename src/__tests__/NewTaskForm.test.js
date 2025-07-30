 import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

test("calls the onTaskFormSubmit callback prop when the form is submitted", () => {
  render(<App />);

  // Fill in task text using placeholder
  fireEvent.change(screen.getByPlaceholderText("New task details"), {
    target: { value: "Pass the tests" },
  });

  // Select category from dropdown
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Code" },
  });

  // Submit the form
  fireEvent.click(screen.getByDisplayValue("Add task"));

  // Expect the new task to appear
  expect(screen.getByText("Pass the tests")).toBeInTheDocument();
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  // Count how many "Code" tasks before adding
  const initialCount = screen.queryAllByText(/Code/).length;

  fireEvent.change(screen.getByPlaceholderText("New task details"), {
    target: { value: "Write more tests" },
  });

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Code" },
  });

  fireEvent.click(screen.getByDisplayValue("Add task"));

  // Count again
  const newCount = screen.queryAllByText(/Code/).length;
  expect(newCount).toBeGreaterThan(initialCount);
});

