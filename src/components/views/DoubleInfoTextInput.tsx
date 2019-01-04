import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import DatePicker, { DatePickerProps } from "react-native-datepicker";

import { fontStyles } from "../../styles";
import { SAText } from "../customs/SAText";

interface IProps extends DatePickerProps {
  firstPlaceholder: string;
  secondPlaceholder: string;
  firstDate: string;
  secondDate: string;
  onFirstDateChange: (dateStr: string, date: Date) => void;
  onSecondDateChange: (dateStr: string, date: Date) => void;
}

export const DoubleInfoTextInput: React.SFC<IProps> = ({
  firstPlaceholder,
  secondPlaceholder,
  firstDate,
  secondDate,
  onFirstDateChange,
  onSecondDateChange
}) => (
  <View style={styles.container}>
    <View style={styles.textinputContainer}>
      <DatePicker
        style={{ width: 58 }}
        date={firstDate}
        mode="time"
        placeholder={firstPlaceholder}
        format="HH:mm"
        confirmBtnText="확인"
        cancelBtnText="취소"
        customStyles={{
          dateIcon: {
            width: 0,
            height: 0
          },
          dateText: fontStyles.spoqahansans16PtB,
          dateInput: {
            width: 58,
            height: 30,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderWidth: 0
          },
          dateTouchBody: {
            width: 58,
            height: 30,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          },
          placeholderText: [fontStyles.spoqahansans16PtB, { color: "#e9e9e9" }],
          datePickerCon: { backgroundColor: "#1a191d" },
          datePicker: { borderTopColor: "#3e3e40" },
          btnTextCancel: {
            color: "white"
          },
          btnTextConfirm: {
            color: "white"
          }
        }}
        onDateChange={onFirstDateChange}
      />
      <SAText style={fontStyles.spoqahansans16PtB}>/ </SAText>
      <DatePicker
        style={{ width: 58 }}
        date={secondDate}
        mode="time"
        placeholder={secondPlaceholder}
        format="HH:mm"
        confirmBtnText="확인"
        cancelBtnText="취소"
        customStyles={{
          dateIcon: {
            width: 0,
            height: 0
          },
          dateText: fontStyles.spoqahansans16PtB,
          dateInput: {
            width: 58,
            height: 30,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderWidth: 0
          },
          dateTouchBody: {
            width: 58,
            height: 30,
            justifyContent: "flex-start",
            alignItems: "flex-start"
          },
          placeholderText: [fontStyles.spoqahansans16PtB, { color: "#e9e9e9" }],
          datePickerCon: { backgroundColor: "#1a191d" },
          datePicker: { borderTopColor: "#3e3e40" },
          btnTextCancel: {
            color: "white"
          },
          btnTextConfirm: {
            color: "white"
          }
        }}
        onDateChange={onSecondDateChange}
      />
    </View>
    <View style={styles.blackLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 44
  },
  blackLine: {
    height: 4,
    backgroundColor: "black",
    marginTop: 2
  },
  textinputContainer: {
    flexDirection: "row"
  }
});
