import React, { useState } from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";
import VirtualizedList from "./components/VirtualizedList";
import SelectedItems from "./components/SelectedItems";

export const TEXTS = {
  info: "Info",
};

const List = <T extends {}>(props: ListProps<T>) => {
  const [selected, setSelected] = useState<number[]>([]);
  const handleChange = React.useCallback((selectedNumber: number) =>
    setSelected((oldSelection: number[]) => {
      if (oldSelection.includes(selectedNumber)) {
        return oldSelection.filter((item) => item !== selectedNumber);
      }
      return [...oldSelection, selectedNumber].sort((a, b) => a - b);
    })
  , [])
  const handleDeselect = React.useCallback(() => setSelected([]), [])

  return (
    <div className={styles.listContainer}>
      <SelectedItems selected={selected} handleDeselect={handleDeselect} />
      <section className={styles.list} role="list">
        <div className={styles.listHeaders}>
          <h3 className={styles.listHeader}></h3>
          <h3 className={styles.listHeader}>{TEXTS.info}</h3>
        </div>
        <VirtualizedList<T>
          data={props.data}
          infoRenderer={props.infoRenderer}
          selectedItems={selected}
          onSelectItem={handleChange}
        />
      </section>
    </div>
  );
};

export default List;
