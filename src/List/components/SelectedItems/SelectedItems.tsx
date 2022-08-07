import React from "react";

import styles from "./SelectedItems.module.scss";

export const TEXTS = {
  selectedItems: "Selected Items:",
  noSelectedItem: "There is no selected item. Please select an item below.",
};

interface SelectedItemsProps {
  selected: number[];
  handleDeselect: () => void;
}

export const SelectedItems = ({
  handleDeselect,
  selected,
}: SelectedItemsProps) => (
  <div className={styles.selectedItems}>
    <h2>{TEXTS.selectedItems}</h2>
    {selected.length ? (
      <p
        className={styles.selectedItemContainer}
        role="status"
        aria-live="polite"
        aria-label="selecteditems"
      >
        {selected.join(", ")}
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

export default SelectedItems;
