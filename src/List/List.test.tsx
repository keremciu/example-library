// Generated with util/create-component.js
import React from "react";
import { render, screen } from "@testing-library/react";

import List from "./List";
import { ListProps } from "./List.types";

describe("Test Component", () => {
  const setup = (props) => {
    render(<List {...props} />);
  }

  it("should render foo text correctly", () => {
    setup({ foo: "text prop is this one" })

    expect(screen.getByText(/text prop is this one/i)).toBeInTheDocument();
  });
});
