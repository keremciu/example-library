import React from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";

export const TEXTS = {
  info: "Info",
};

const List = <T extends {}>(props: ListProps<T>) => (
  <div className={styles.listContainer}>
    <div className={styles.selectedItems}>Selected Items</div>
    <div className={styles.list}>
      <div className={styles.listHeaders}>
        <h3 className={styles.listHeader}></h3>
        <h3 className={styles.listHeader}>{TEXTS.info}</h3>
      </div>
      {props.data.map((item, index) => {
        const itemKeys = Object.keys(item).filter(
          (key) => key !== "id"
        ) as Array<keyof typeof item>;
        return (
          <div className={styles.listItem}>
            <div className={styles.listItemCell}>
              <label>
              <input type="checkbox" id={`listitem-checkbox-${index}`} value={index} />
              </label>
            </div>
            <div className={styles.listItemCell}>
              {itemKeys.map((key) => (
                <div>
                <label
                  key={`${String(key)}${index}`}
                  htmlFor={`listitem-checkbox-${index}`}
                >
                  {props.infoRenderer(item, key)}
                </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default List;
