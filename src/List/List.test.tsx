import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import List, { TEXTS } from "./List";
import { TEXTS as SelectedItemsTEXTS } from "./components/SelectedItems/SelectedItems";

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

const simpleInfoRendererFunc = (item, key) => <span>{item[key]}</span>;

describe("Test Component", () => {
  const user = userEvent.setup();

  it("should render info list header and no selected item text", () => {
    render(<List data={firstDataSet} infoRenderer={simpleInfoRendererFunc} />);

    expect(
      screen.getByRole("heading", { level: 3, name: TEXTS.info })
    ).toBeInTheDocument();
    expect(
      screen.getByText(SelectedItemsTEXTS.noSelectedItem)
    ).toBeInTheDocument();
  });

  describe("accepts an array of objects with any structure", () => {
    describe("when object has only id and title keys", () => {
      it("should render titles and checkboxes", () => {
        render(
          <List data={firstDataSet} infoRenderer={simpleInfoRendererFunc} />
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
          <List data={secondDataSet} infoRenderer={simpleInfoRendererFunc} />
        );

        // put for loop when it passes
        expect(screen.getByText(secondDataSet[0].name)).toBeInTheDocument();
        expect(
          screen.queryAllByRole("checkbox", { checked: false })
        ).toHaveLength(secondDataSet.length);
      });
    });
  });

  describe("selected items shown on the screen", () => {
    it("user selects first item and sees 0 in selected items list", async () => {
      render(
        <List data={firstDataSet} infoRenderer={simpleInfoRendererFunc} />
      );
      expect(
        screen.getByText(SelectedItemsTEXTS.noSelectedItem)
      ).toBeInTheDocument();
      const firstCheckbox = screen.getByLabelText(firstDataSet[0].title);
      expect(firstCheckbox).not.toBeChecked();
      await user.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
      expect(screen.getByLabelText("selecteditems").innerHTML).toContain("0");
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: SelectedItemsTEXTS.selectedItems,
        })
      ).toBeInTheDocument();
    });

    it("user selects more than 1 item and sees their index in selected items list", async () => {
      render(
        <List data={firstDataSet} infoRenderer={simpleInfoRendererFunc} />
      );
      const secondCheckbox = screen.getByLabelText(firstDataSet[1].title);
      const thirdCheckbox = screen.getByLabelText(firstDataSet[2].title);

      // check second checkbox
      expect(secondCheckbox).not.toBeChecked();
      await user.click(secondCheckbox);
      expect(secondCheckbox).toBeChecked();
      expect(screen.getByLabelText("selecteditems").innerHTML).toContain("1");
      expect(
        screen.queryByText(SelectedItemsTEXTS.noSelectedItem)
      ).not.toBeInTheDocument();

      // check third checkbox
      expect(thirdCheckbox).not.toBeChecked();
      await user.click(thirdCheckbox);
      expect(thirdCheckbox).toBeChecked();
      expect(screen.getByLabelText("selecteditems").innerHTML).toContain(
        "1, 2"
      );
    });

    describe("when user clicks deselect all button", () => {
      it("user sees no selected item text and checkbox is unchecked", async () => {
        render(
          <List data={firstDataSet} infoRenderer={simpleInfoRendererFunc} />
        );
        expect(
          screen.getByText(SelectedItemsTEXTS.noSelectedItem)
        ).toBeInTheDocument();
        const firstCheckbox = screen.getByLabelText(firstDataSet[0].title);
        expect(firstCheckbox).not.toBeChecked();
        await user.click(firstCheckbox);
        expect(firstCheckbox).toBeChecked();
        expect(screen.getByLabelText("selecteditems").innerHTML).toContain("0");
        expect(
          screen.queryByText(SelectedItemsTEXTS.noSelectedItem)
        ).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: /deselect all/i }));
        expect(
          screen.getByText(SelectedItemsTEXTS.noSelectedItem)
        ).toBeInTheDocument();
      });
    });
  });
});
