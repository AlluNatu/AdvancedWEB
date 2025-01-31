import { act } from "react";
import About from "../components/About";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Assuming i18n is set up

// Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          title: `title ${i + 1}`,
          body: `body ${i + 1}`,
        }))
      )
  }) as never
);

test("showMoreItems increases visible items on button click", async () => {
  // Render the component
  await act(async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <About />
      </I18nextProvider>
    );
  });

  // Verify initial state: 12 items should be visible
  await waitFor(() => {
    const updatedItems = document.querySelectorAll("div.grid-item");
    expect(updatedItems).toHaveLength(12);
  });

  // Simulate clicking the "Show more" button
  const button = screen.getByRole("button", { name: /show more/i });
  act(() => {
    fireEvent.click(button);
  });

  // Verify updated state: 12 more items should now be visible
  await waitFor(() => {
    const updatedItems = document.querySelectorAll("div.grid-item");
    expect(updatedItems).toHaveLength(24);
  });
});