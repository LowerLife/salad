import moment from "moment";
import { Alert } from "react-native";
import { observable, action, computed } from "mobx";

import { LocalStorage, USER } from "../utils";
import { UserType } from "../stores/User";

class SalaryStore {
  @observable dayMoney: number = 0;
  @observable monthMoney: number = 0;
  @observable yearMoney: number = 0;
  @observable getOffDiff: number = 0;
  @observable salaryDayDiff: number = 0;
  @observable negoDayDiff: number = 0;

  input: number = 0;
  daysInMonth: number = 0;

  @computed get getoffTime(): number {
    return this.getOffDiff;
  }

  @computed get salaryTime(): number {
    return this.salaryDayDiff;
  }

  @computed get negoTime(): number {
    return this.negoDayDiff;
  }

  getMoneyForSec = async (): Promise<number> => {
    const userInfoStr = await LocalStorage.getItem(USER);
    const userInfo: UserType = JSON.parse(userInfoStr);
    const input = userInfo.monthSalary;
    const daysInMonth = moment().daysInMonth();

    return input / daysInMonth / 24 / (60 * 60);
  };

  getMoneyForSecDay = async (): Promise<number> => {
    const userInfoStr = await LocalStorage.getItem(USER);
    const userInfo: UserType = JSON.parse(userInfoStr);
    const input = userInfo.monthSalary;
    const daysInMonth = moment().daysInMonth();
    const workingTime = userInfo.workEndTime - userInfo.workStartTime;

    return input / daysInMonth / workingTime / (60 * 60);
  };

  @action startCalDayMoney = async () => {
    const userInfoStr = await LocalStorage.getItem(USER);
    const userInfo: UserType = JSON.parse(userInfoStr);
    const workedTime =
      (new Date().getHours() - userInfo.workStartTime) * (60 * 60) +
      new Date().getMinutes() * 60 +
      new Date().getSeconds();
    const moneyForSec = await this.getMoneyForSecDay();

    if (workedTime < 0 || userInfo.workEndTime <= new Date().getHours()) {
      return;
    }

    const defaultMoney = workedTime * moneyForSec;
    this.dayMoney = Math.ceil(defaultMoney);

    window.setInterval(() => {
      this.dayMoney += Math.ceil(moneyForSec);
      this.getOffDiff = userInfo.workEndTime - new Date().getHours();
    }, 1000);
  };

  @action startCalMonthMoney = async () => {
    const userInfoStr = await LocalStorage.getItem(USER);
    const userInfo: UserType = JSON.parse(userInfoStr);
    let workedTime;
    console.log("userInfo", userInfo);

    // 월급날 전 또는 당일일 때
    if (new Date(userInfo.salaryDate).getDate() >= new Date().getDate()) {
      workedTime =
        moment(new Date().getMonth()).daysInMonth() -
        new Date(userInfo.salaryDate).getDate() +
        new Date().getDate();
    } else {
      // 월급날 후 일때
      workedTime =
        new Date().getDate() - new Date(userInfo.salaryDate).getDate();
    }

    const moneyForSec = await this.getMoneyForSec();
    const defaultMoney = (workedTime - 1) * 24 * 60 * 60 * moneyForSec;
    this.monthMoney = Math.ceil(defaultMoney);
    this.salaryDayDiff =
      moment(new Date().getMonth() + 1).daysInMonth() - workedTime;
    window.setInterval(() => {
      this.monthMoney += Math.ceil(moneyForSec);
    }, 1000);
  };

  @action startCalYearMoney = async () => {
    const userInfoStr = await LocalStorage.getItem(USER);
    const userInfo: UserType = JSON.parse(userInfoStr);
    const input = userInfo.monthSalary;
    let workedTime;

    // 다음년도일 때
    if (new Date(userInfo.joinDate).getFullYear() < new Date().getFullYear()) {
      workedTime =
        12 - new Date(userInfo.joinDate).getMonth() + 1 - new Date().getMonth();
    } else {
      // 이전년도일 또는 같으년도 일때
      workedTime = new Date().getMonth();
    }

    console.log(workedTime);

    const moneyForSec = await this.getMoneyForSec();
    const defaultMoney = workedTime * input + this.monthMoney;
    this.yearMoney = Math.ceil(defaultMoney);
    this.negoDayDiff = 12 - workedTime;

    window.setInterval(() => {
      this.yearMoney += Math.ceil(moneyForSec);
    }, 1000);
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
export type SalaryType = typeof Salary;
