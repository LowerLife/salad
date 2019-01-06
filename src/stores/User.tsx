import { observable, action } from "mobx";

import { LocalStorage, USER } from "../utils";

class UserStore {
  @observable monthSalary: number = 0;
  @observable joinDate: Date = new Date();
  @observable salaryDate: Date = new Date();
  @observable workStartTime: number = new Date().getTime();
  @observable workEndTime: number = new Date().getTime();

  @action setUserInfo = (
    monthSalary: number,
    joinDate: Date,
    salaryDate: Date,
    workStartTime: number,
    workEndTime: number
  ) => {
    this.monthSalary = monthSalary;
    this.joinDate = joinDate;
    this.salaryDate = salaryDate;
    this.workStartTime = workStartTime;
    this.workEndTime = workEndTime;

    LocalStorage.setItem(
      USER,
      JSON.stringify({
        monthSalary,
        joinDate,
        salaryDate,
        workStartTime,
        workEndTime
      })
    );
  };
}

export const User = new UserStore();
export type UserType = typeof User;
