import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

import React from "react";
import App from "../App";
import Header from "../components/Header";
import MyContainer from "../components/MyContainer";
import About from "../components/About";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

// Cast mocked components to jest.Mock
jest.mock("../components/Header");
jest.mock("../components/MyContainer");
jest.mock("../components/About");

const MockedHeader = Header as jest.Mock;
const MockedMyContainer = MyContainer as jest.Mock;
const MockedAbout = About as jest.Mock;

describe("App component routing", () => {
  test("Should render page header and HomePage on default route", () => {
    MockedHeader.mockImplementation(() => (
      <div data-testid="pg-header">PageHeaderMock</div>
    ));
    MockedMyContainer.mockImplementation(() => (
      <div data-testid="pg-container">MyContainerMock</div>
    ));
    MockedAbout.mockImplementation(() => (
      <div data-testid="pg-about">AboutPageMock</div>
    ));

    const { queryByTestId, getByTestId }: RenderResult = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByTestId("pg-header")).toBeInTheDocument();
    expect(getByTestId("pg-container")).toBeInTheDocument();
    expect(queryByTestId("pg-about")).not.toBeInTheDocument();
  });

  test("Should render page header and AboutPage in /about route", () => {
    MockedHeader.mockImplementation(() => (
      <div data-testid="pg-header">PageHeaderMock</div>
    ));
    MockedMyContainer.mockImplementation(() => (
      <div data-testid="pg-container">MyContainerMock</div>
    ));
    MockedAbout.mockImplementation(() => (
      <div data-testid="pg-about">AboutPageMock</div>
    ));

    const { queryByTestId, getByTestId }: RenderResult = render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByTestId("pg-header")).toBeInTheDocument();
    expect(getByTestId("pg-about")).toBeInTheDocument();
    expect(queryByTestId("pg-container")).not.toBeInTheDocument();
  });
});