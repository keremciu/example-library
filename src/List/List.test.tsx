import React from "react";
import { render, screen } from "@testing-library/react";

import List, { TEXTS } from "./List";

type TFirstDataItem = {
  id: number;
  title: string;
};
const firstDataSet: TFirstDataItem[] = [
  { id: 1, title: "Title 1" },
  { id: 2, title: "Title 2" },
  { id: 3, title: "Title 3" },
];

type TSecondDataItem = {
  name: string;
  description: string;
  link?: string;
};

const secondDataSet: TSecondDataItem[] = [
  { name: "Name 1", description: "Description 1" },
  { name: "Name 2", description: "Description 2", link: "google.com" },
  { name: "Name 3", description: "Description 3" },
];

describe("Test Component", () => {
  it("should render info list header", () => {
    render(<List data={firstDataSet} infoRenderer={() => <span>test</span>} />);

    expect(
      screen.getByRole("heading", { level: 3, name: TEXTS.info })
    ).toBeInTheDocument();
  });

  describe("accepts an array of objects with any structure", () => {
    describe("when object has only id and title keys", () => {
      it("should render titles and checkboxes", () => {
        render(
          <List data={firstDataSet} infoRenderer={() => <span>test</span>} />
        );

        // put for loop when it passes
        expect(screen.getByText(firstDataSet[0].title)).toBeInTheDocument();
        expect(
          screen.queryAllByRole("checkbox", { checked: false })
        ).toHaveLength(firstDataSet.length);
      });
    });

    describe("when object has name, description and link keys", () => {
      it("should render name, description, link with their separate checkboxes", () => {
        render(
          <List data={secondDataSet} infoRenderer={() => <span>test</span>} />
        );

        // put for loop when it passes
        expect(screen.getByText(secondDataSet[0].name)).toBeInTheDocument();
        expect(
          screen.queryAllByRole("checkbox", { checked: false })
        ).toHaveLength(
          secondDataSet.length * Object.keys(secondDataSet[0]).length
        );
      });
    });
  });
});
