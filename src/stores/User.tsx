import { observable, action } from "mobx";

class UserStore {
  @observable monthSalary: number = 0;
  @observable joinDate: string = "0";
  @observable salaryDate: string = "0";

  @action setUserInfo = (
    monthSalary: number,
    joinDate: string,
    salaryDate: string
  ) => {
    this.monthSalary = monthSalary;
    this.joinDate = joinDate;
    this.salaryDate = salaryDate;
  };
}

export const User = new UserStore();
