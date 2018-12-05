import { observable, action } from "mobx";

class CounterStore {
  @observable number = 0;

  @action increase = () => {
    this.number++;
  };

  @action decrease = () => {
    this.number--;
  };
}

export const Counter = new CounterStore();
