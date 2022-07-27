import React from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";

export const TEXTS = {
  info: "Info",
  selectedItems: "Selected Items:",
  noSelectedItem: "There is no selected item. Please select an item below.",
};

const List = <T extends {}>(props: ListProps<T>) => (
  <div className={styles.listContainer}>
    <div className={styles.selectedItems}>
      <p>{TEXTS.noSelectedItem}</p>
      <h2>{TEXTS.selectedItems}</h2>
      <div role="status" aria-live="polite" aria-label="selecteditems"></div>
    </div>
    <section className={styles.list} role="list">
      <div className={styles.listHeaders}>
        <h3 className={styles.listHeader}></h3>
        <h3 className={styles.listHeader}>{TEXTS.info}</h3>
      </div>
      {props.data.map((item, index) => {
        const itemKeys = Object.keys(item).filter(
          (key) => key !== "id"
        ) as Array<keyof typeof item>;
        return (
          <div role="listitem" className={styles.listItem} key={index}>
            <div className={styles.listItemCell}>
              <label>
                <input
                  type="checkbox"
                  id={`listitem-checkbox-${index}`}
                  value={index}
                />
              </label>
            </div>
            <div className={styles.listItemCell}>
              {itemKeys.map((key) => (
                <div key={`${String(key)}${index}`}>
                  <label htmlFor={`listitem-checkbox-${index}`}>
                    {props.infoRenderer(item, key)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  </div>
);

export default List;
