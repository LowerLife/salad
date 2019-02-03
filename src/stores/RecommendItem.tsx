import { observable, action } from "mobx";

import agent from "../lib/agent";

export type RecommendItemType = {
  id: number;
  name: string;
  url: string;
  price: number;
};

class RecommendItemStore {
  @observable dayRecommendItems: RecommendItemType[] = [];
  @observable monthRecommendItems: RecommendItemType[] = [];
  @observable yearRecommendItems: RecommendItemType[] = [];

  @action fetchDayRecommendItems = async (price: number) => {
    try {
      const dayRecommendItems = await agent.requests.getWithQuery(
        "",
        "/items",
        {
          price
        }
      );
      this.dayRecommendItems.push(...dayRecommendItems);
    } catch (error) {
      console.log("fetchDayRecommendItems error");
    }
  };

  @action fetchMonthRecommendItems = async (price: number) => {
    try {
      const monthRecommendItems = await agent.requests.getWithQuery(
        "",
        "/items",
        {
          price
        }
      );
      this.monthRecommendItems.push(...monthRecommendItems);
    } catch (error) {
      console.log("fetchDayRecommendItems error");
    }
  };

  @action fetchYearRecommendItems = async (price: number) => {
    try {
      const yearRecommendItems = await agent.requests.getWithQuery(
        "",
        "/items",
        {
          price
        }
      );
      this.yearRecommendItems.push(...yearRecommendItems);
    } catch (error) {
      console.log("fetchDayRecommendItems error");
    }
  };
}

export const RecommendItem = new RecommendItemStore();
export type RecommendItemStoreType = typeof RecommendItem;
