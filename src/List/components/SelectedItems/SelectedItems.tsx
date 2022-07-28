import React, { forwardRef, useState, useImperativeHandle } from "react";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";

import styles from "./SelectedItems.module.scss";

export const TEXTS = {
  selectedItems: "Selected Items:",
  noSelectedItem: "There is no selected item. Please select an item below.",
};

type SelectedItemHandle = {
  handleSelection: (selectedNumber: number) => void;
};

export const SelectedItems = forwardRef(
  (_, forwardedRef: React.Ref<SelectedItemHandle>) => {
    const [selected, setSelected] = useState<number[]>([]);

    const handleSelection = (selectedNumber: number) =>
      setSelected((oldSelection: number[]) => {
        if (oldSelection.includes(selectedNumber)) {
          return oldSelection.filter((item) => item !== selectedNumber);
        }
        return [...oldSelection, selectedNumber];
      });

    useImperativeHandle(forwardedRef, () => ({
      handleSelection,
    }));

    const handleDeselect = () => {
      // there is a dom manipulation, we can achieve this with passing state and only rerender checkbox.
      // I leave it like this for time constraints.
      document
        .querySelectorAll("input[type=checkbox][name=listitem-checkbox]")
        .forEach((el: HTMLInputElement) => (el.checked = false));
      return setSelected([]);
    };

    return (
      <div className={styles.selectedItems}>
        <h2>{TEXTS.selectedItems}</h2>
        {selected.length ? (
          <p
            className={styles.selectedItemContainer}
            role="status"
            aria-live="polite"
            aria-label="selecteditems"
          >
            {selected.sort((a, b) => a - b).join(", ")}
            <button
              type="button"
              className={styles.deselectButton}
              onClick={handleDeselect}
            >
              Deselect all
            </button>
          </p>
        ) : (
          <p className={styles.selectedItemContainer}>{TEXTS.noSelectedItem}</p>
        )}
      </div>
    );
  }
);

export default SelectedItems;
