import React, { ReactNode } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { deviceSizes } from "../../utils";

const MINIMUM_HEIGHT = 640;

interface IProps {
  children: ReactNode;
}

export const ScrollIfSmallView: React.SFC<IProps> = ({ children }) => (
  <>
    {deviceSizes.height > MINIMUM_HEIGHT ? (
      <View style={styles.container}>{children}</View>
    ) : (
      <ScrollView>{children}</ScrollView>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
