import React from "react";

import { ListProps } from "./List.types";

import styles from "./List.module.scss";

const List: React.FC<ListProps> = () => <div className={styles.foo}>test</div>;

export default List;
