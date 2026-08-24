import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Stats from "./Stats";

describe("Stats", () => {
  it("shows total, active, completed and overdue counts", () => {
    const yesterday = new Date(Date.now() - 86_400_000)
      .toISOString()
      .slice(0, 10);

    render(
      <Stats
        tasks={[
          {
            id: 1,
            completed: false,
            dueDate: yesterday,
          },
          {
            id: 2,
            completed: true,
            dueDate: null,
          },
          {
            id: 3,
            completed: false,
            dueDate: null,
          },
        ]}
      />,
    );

    expect(screen.getByText("Total").nextElementSibling).toHaveTextContent("3");
    expect(screen.getByText("Active").nextElementSibling).toHaveTextContent("2");
    expect(screen.getByText("Completed").nextElementSibling).toHaveTextContent("1");
    expect(screen.getByText("Overdue").nextElementSibling).toHaveTextContent("1");
  });
});
