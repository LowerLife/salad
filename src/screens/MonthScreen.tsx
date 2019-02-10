import _ from "lodash";
import React, { RefObject } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Linking,
  Alert
} from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import { observer, inject } from "mobx-react";

import Images from "../../assets/images";
import { SAText, SAButton } from "../components/customs";
import { colors, fontStyles } from "../styles";
import { deviceSizes } from "../utils";
import {
  RecommendItemStoreType,
  RecommendItemType
} from "../stores/RecommendItem";

interface IProps {
  money: number;
  salaryDayDiff: number;
  monthRecommendItems: RecommendItemType[];
  fetchMonthRecommendItems?: (price: number) => void;
  current: boolean;
}

@inject(({ RecommendItem }: { RecommendItem: RecommendItemStoreType }) => ({
  monthRecommendItems: RecommendItem.monthRecommendItems,
  fetchMonthRecommendItems: RecommendItem.fetchMonthRecommendItems
}))
@observer
export default class MonthScreen extends React.Component<IProps> {
  incresingCount: number = 0;
  scrollView: RefObject<FlatList<RecommendItemType>> = React.createRef();
  animatedCount: number = 0;

  public componentDidUpdate = () => {
    this.incresingCount += 1;
    if (
      this.props.fetchMonthRecommendItems &&
      this.props.current &&
      this.incresingCount % 6 === 0
    ) {
      this.props.fetchMonthRecommendItems(this.props.money);

      if (
        this.props.monthRecommendItems.length > 0 &&
        this.props.monthRecommendItems[this.animatedCount]
      ) {
        this.scrollView.current!.scrollToIndex({
          animated: true,
          index: this.animatedCount
        });
        this.animatedCount += 1;
      }
    }
  };

  private onPressItem = (url: string) => {
    try {
      Linking.openURL(url);
    } catch (error) {
      Alert.alert("에러!", "오류가 발생했어요");
    }
  };

  private renderItem = ({ item }: { item: RecommendItemType }) => (
    <SAButton
      onPress={_.partial(this.onPressItem, item.url)}
      style={styles.recommnedLine}
    >
      <SAText
        style={[fontStyles.spoqahansans12Pt, { color: colors.dark_grey }]}
      >
        현재 돈으로 구매할 수 있는 물품은
        <SAText style={[fontStyles.spoqahansans12Pt, { color: colors.red }]}>
          {item.name}
        </SAText>
        입니다
      </SAText>
    </SAButton>
  );

  private keyExtractor = (item: RecommendItemType, index: number) =>
    `${item.id}-${index}`;

  private renderEmptyView = () => (
    <SAText
      style={[
        fontStyles.spoqahansans12Pt,
        { color: colors.dark_grey, marginTop: 8 }
      ]}
    >
      그래도 이 돈으론 뭘 살 수 있지 않을까?
    </SAText>
  );

  public render() {
    const { money, salaryDayDiff, monthRecommendItems } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.absRedView} />
        <View style={styles.body}>
          <View style={styles.topView}>
            <SAText style={[fontStyles.anton26Pt, { color: colors.white }]}>
              1 MONTH
            </SAText>
            <SAText style={[fontStyles.anton14Pt, { color: colors.grey }]}>
              HOURLY PAY
            </SAText>
          </View>
          <View style={styles.bottomAbsView}>
            <SAText style={[fontStyles.spoqahansans20PtB]}>
              {"조금만 더 참아요 월급날까지\n"}
              <SAText
                style={[fontStyles.spoqahansans20PtB, { color: colors.red }]}
              >
                {`${salaryDayDiff}일`}
              </SAText>
              남았어요.
            </SAText>
            <View>
              <Image source={Images.img_month} style={styles.img} />
              <SAText style={[fontStyles.anton28Pt, { marginTop: 44 }]}>
                {money.toLocaleString()}
              </SAText>
              <View style={styles.blackLine} />
              <View style={styles.wonView}>
                <SAText style={[fontStyles.anton14Pt, { color: colors.grey }]}>
                  WON
                </SAText>
              </View>
            </View>
            <FlatList
              ref={this.scrollView}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              data={Array.from(monthRecommendItems)}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderEmptyView}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: deviceSizes.width,
    height: deviceSizes.height
  },
  body: {
    paddingHorizontal: 32,
    flex: 1
  },
  topView: {
    marginTop: getStatusBarHeight(true) + 41
  },
  bottomAbsView: {
    bottom: getBottomSpace() + 28,
    position: "absolute",
    paddingHorizontal: 32,
    width: deviceSizes.width
  },
  blackLine: {
    backgroundColor: colors.black,
    width: deviceSizes.width - 64,
    height: 4
  },
  recommnedLine: {
    marginTop: 8
  },
  img: {
    position: "absolute",
    right: 0,
    top: 49,
    zIndex: 100
  },
  absRedView: {
    position: "absolute",
    width: deviceSizes.width,
    height: getStatusBarHeight(true) + 124,
    backgroundColor: colors.red
  },
  wonView: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  emptyView: {
    height: 24,
    marginTop: 50
  },
  list: {
    height: 28,
    marginTop: 19
  }
});
