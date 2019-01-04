import React from "react";
import { View, StyleSheet, TextInput, KeyboardType } from "react-native";

import { fontStyles } from "../../styles";

interface IProps {
  placeholder: string;
  value?: string;
  keyboardType?: KeyboardType;
  onChangeText: (text: string) => void;
}

export const InfoTextInput: React.SFC<IProps> = ({
  placeholder,
  value,
  keyboardType,
  onChangeText
}) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.textInput, fontStyles.spoqahansans16PtB]}
      placeholderTextColor={"#e9e9e9"}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      keyboardAppearance="dark"
      onChangeText={onChangeText}
    />
    <View style={styles.blackLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 44
  },
  textInput: {
    width: "100%"
  },
  blackLine: {
    height: 4,
    backgroundColor: "black",
    marginTop: 2
  }
});

InfoTextInput.defaultProps = {
  keyboardType: "default"
};
