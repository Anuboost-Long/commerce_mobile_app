import React from "react";
import { DimensionValue, View } from "react-native";

type SizedBox = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const SizedBox = ({ height, width }: SizedBox) => {
  return <View style={{ height, width }} />;
};

export default SizedBox;
