import { act } from "react";
import About from "../components/About";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

// Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          title: `title ${i + 1}`,
          body: `body ${i + 1}`,
        }))
      )
  }) as any
);

test("renders grid-container and grid-items with h3 and p elements", async () => {
  // Render the About component
  await act(async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <About />
      </I18nextProvider>
    );
  });

  // Wait for the data to load and render
  await waitFor(() => {
    // Check that the grid-container exists
    const gridContainer = document.querySelector(".grid-container");
    expect(gridContainer).toBeInTheDocument();

    // Check that the grid-container has children with the class grid-item
    const gridItems = document.querySelectorAll(".grid-container .grid-item");
    expect(gridItems).toHaveLength(5); // 5 items mocked in the fetch response

    // Check each grid-item contains an h3 and a p element
    gridItems.forEach((item) => {
      const title = item.querySelector("h3");
      const body = item.querySelector("p");
      expect(title).toBeInTheDocument();
      expect(body).toBeInTheDocument();
    });
  });
});