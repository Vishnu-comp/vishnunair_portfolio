import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ReelPortfolio from "./ReelPortfolio";
beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});
function setup() {
  render(
    <MemoryRouter>
      <ReelPortfolio />
    </MemoryRouter>,
  );
}
test("renders Vishnu and the primary sections", () => {
  setup();
  expect(
    screen.getByRole("heading", { name: /Full Stack Developer/, level: 1 }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Hi, I.*Vishnu/ }),
  ).toBeInTheDocument();
  expect(document.querySelectorAll(".rp-element")).toHaveLength(20);
});
test("selects a skill and updates the detail panel", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "React, Frontend" }));
  expect(document.querySelector(".rp-skill-detail h3")).toHaveTextContent(
    "React",
  );
});
test("filters the periodic table", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Backend", exact: true }));
  expect(document.querySelectorAll(".rp-element.muted")).toHaveLength(15);
});
test("changes project from the accordion tabs", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: /02 Unishare/ }));
  expect(document.querySelector(".rp-project-copy h3")).toHaveTextContent(
    "Unishare",
  );
  expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/Vishnu-comp/UNISHARE",
  );
});
test("opens mobile navigation and closes it after a selection", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(
    screen.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("link", { name: "Skills", exact: true }));
  expect(
    screen.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("ID card supports keyboard tilt and reset", () => {
  setup();
  const card = screen.getByRole("button", { name: /Interactive developer ID/ });
  fireEvent.keyDown(card, { key: "ArrowRight" });
  expect(card.style.getPropertyValue("--tilt")).toBe("15deg");
  fireEvent.keyDown(card, { key: "Escape" });
  expect(card.style.getPropertyValue("--tilt")).toBe("0deg");
});
