import React from "react";
import DatePicker, { DatePickerProps } from "react-native-datepicker";
import { View, StyleSheet } from "react-native";

import { fontStyles } from "../../styles";

interface IProps extends DatePickerProps {
  width: number;
}

export const DateInfoPikcer: React.SFC<IProps> = ({
  date,
  placeholder,
  mode,
  format,
  onDateChange,
  width,
  maxDate
}) => (
  <View>
    <DatePicker
      style={{ width: "100%" }}
      date={date}
      mode={mode}
      placeholder={placeholder}
      format={format}
      minDate="2019년 1월 1일"
      maxDate={maxDate}
      confirmBtnText="확인"
      cancelBtnText="취소"
      customStyles={{
        dateIcon: {
          width: 0,
          height: 0
        },
        dateText: fontStyles.spoqahansans16PtB,
        dateInput: {
          width,
          height: 30,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderWidth: 0
        },
        dateTouchBody: {
          width,
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
      onDateChange={onDateChange}
    />
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
