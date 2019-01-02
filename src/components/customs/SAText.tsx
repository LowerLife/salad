import React, { ReactNode } from "react";
import { Text, TextStyle, RegisteredStyle } from "react-native";

interface IProps {
  style?: RegisteredStyle<TextStyle> | Array<RegisteredStyle<TextStyle>>;
  children: ReactNode;
}

export const SAText: React.SFC<IProps> = ({ children, style }) => (
  <Text style={style}>{children}</Text>
);
