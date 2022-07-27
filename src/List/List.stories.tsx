import React from "react";
import List from "./List";

export default {
  title: "List",
};

const thirdDataSet = Array.apply(null, Array(100)).map(function (
  _x: undefined,
  i: number
) {
  return {
    id: i,
    title: `Title ${i}`,
    image: `image${i}url`,
    ...(i % 3 === 0 ? { description: 'description' } : {})
  };
});

type Item = {
  id: number;
  title: string;
  image: string;
  description?: string;
};

export const With100Items = () => (
  <List<Item>
    data={thirdDataSet}
    infoRenderer={(item, key) => <span>{item[key]}</span>}
  />
);
