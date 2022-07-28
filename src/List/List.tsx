import React, { useRef, ChangeEvent } from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";
import SelectedItems from "./components/SelectedItems";

export const TEXTS = {
  info: "Info",
};

type SelectedItemHandle = React.ElementRef<typeof SelectedItems>;

const List = <T extends {}>(props: ListProps<T>) => {
  const selectedItemsElement = useRef<SelectedItemHandle>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    selectedItemsElement.current?.handleSelection(Number(event.target.value));

  return (
    <div className={styles.listContainer}>
      <SelectedItems ref={selectedItemsElement} />
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
                    name="listitem-checkbox"
                    value={index}
                    onChange={handleChange}
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
};

export default List;
