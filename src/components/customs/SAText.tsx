import React, { ReactNode } from "react";
import { Text, TextStyle, StyleProp } from "react-native";

interface IProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export const SAText: React.SFC<IProps> = ({ children, style }) => (
  <Text style={style}>{children}</Text>
);
