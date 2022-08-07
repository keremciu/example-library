import React from "react";
import { areEqual, VariableSizeList } from "react-window";

import { ListProps } from "../../List.types";

import styles from "./VirtualizedList.module.scss";

export function ListItemDetails({ item, index, infoRenderer }) {
  const itemKeys = Object.keys(item).filter((key) => key !== "id") as Array<
    keyof typeof item
  >;
  return (
    <div className={styles.listItemCell}>
      {itemKeys.map((key) => (
        <div key={`${String(key)}${index}`}>
          <label htmlFor={`listitem-checkbox-${index}`}>
            {infoRenderer(item, key)}
          </label>
        </div>
      ))}
    </div>
  );
}
export const MemoizedListItemDetails = React.memo(ListItemDetails);

const Row = ({ data, index, style }) => {
  const { items, selectedItems, onSelectItem, infoRenderer } = data;
  const item = items[index];
  return (
    <div style={style} key={index}>
      <div role="listitem" className={styles.listItem}>
        <div className={styles.listItemCell}>
          <label>
            <input
              type="checkbox"
              id={`listitem-checkbox-${index}`}
              name="listitem-checkbox"
              checked={selectedItems.includes(index)}
              onChange={() => onSelectItem(index)}
            />
          </label>
        </div>
        <div className={styles.listItemCell}>
          <MemoizedListItemDetails
            item={item}
            infoRenderer={infoRenderer}
            index={index}
          />
        </div>
      </div>
    </div>
  );
};

function isItemSelectionSame(prevItem, nextItem) {
  return (
    prevItem.data.selectedItems.includes(prevItem.index) ===
    nextItem.data.selectedItems.includes(nextItem.index)
  );
}

const MemoizedRow = React.memo(Row, isItemSelectionSame);

interface VirtualizedList<T> extends ListProps<T> {
  onSelectItem: (arg0: number) => void;
  selectedItems: number[];
}

const VirtualizedList = <T extends {}>(props: VirtualizedList<T>) => {
  function itemSize(index: number) {
    const item = props.data[index];
    const itemKeys = Object.keys(item).filter((key) => key !== "id") as Array<
      keyof typeof item
    >;
    return itemKeys.length * 52;
  }

  const itemData = {
    items: props.data,
    infoRenderer: props.infoRenderer,
    selectedItems: props.selectedItems,
    onSelectItem: props.onSelectItem,
  };

  return (
    <VariableSizeList
      height={350}
      itemCount={props.data.length}
      itemSize={itemSize}
      itemData={itemData}
      estimatedItemSize={52}
      width={335} // width + scrollbar
      className={styles.VariableSizeList}
    >
      {MemoizedRow}
    </VariableSizeList>
  );
};

export default VirtualizedList;
