import { Alert } from "react-native";
import { observable, action } from "mobx";
import { LocalStorage, USER } from "../utils";

class SalaryStore {
  @observable dayMoney = 0;
  @observable monthMoney = 0;
  @observable yearMoney = 0;

  initializeFromAsyncStorage = async () => {
    const userInfo = await LocalStorage.getItem(USER);
    console.log("userInfo", userInfo);
  };

  @action getUserInfo = async () => {
    try {
      const userInfo = await LocalStorage.getItem(USER);
      return JSON.parse(userInfo);
    } catch (error) {
      Alert.alert("실패", "유저가 등록학 정보를 가져오는데 실패했습니다", [
        { text: "확인" }
      ]);
    }
  };
}

export const Salary = new SalaryStore();
Salary.initializeFromAsyncStorage();
export type UserType = typeof Salary;
