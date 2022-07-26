
import React from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";

const List: React.FC<ListProps> = ({ foo }) => (
    <div className={styles.foo}>{foo}</div>
);

export default List;

