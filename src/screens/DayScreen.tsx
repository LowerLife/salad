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
import { getBottomSpace } from "react-native-iphone-x-helper";
import { observer, inject } from "mobx-react";

import Images from "../../assets/images";
import { BasicHeader } from "../components/headers";
import { SAText, SAButton } from "../components/customs";
import { colors, fontStyles } from "../styles";
import { deviceSizes } from "../utils";
import {
  RecommendItemStoreType,
  RecommendItemType
} from "../stores/RecommendItem";

interface IProps {
  money: number;
  getOffDiff: number;
  dayRecommendItems: RecommendItemType[];
  fetchDayRecommendItems?: (price: number) => void;
  current: boolean;
}

@inject(({ RecommendItem }: { RecommendItem: RecommendItemStoreType }) => ({
  dayRecommendItems: RecommendItem.dayRecommendItems,
  fetchDayRecommendItems: RecommendItem.fetchDayRecommendItems
}))
@observer
export default class DayScreen extends React.Component<IProps> {
  incresingCount: number = 0;
  scrollView: RefObject<FlatList<RecommendItemType>> = React.createRef();
  animatedCount: number = 0;

  public componentDidUpdate = () => {
    this.incresingCount += 1;
    if (
      this.props.fetchDayRecommendItems &&
      this.props.current &&
      this.incresingCount % 6 === 0
    ) {
      this.props.fetchDayRecommendItems(this.props.money);

      if (
        this.props.dayRecommendItems.length > 0 &&
        this.props.dayRecommendItems[this.animatedCount]
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
      이 쥐꼬리만한 돈으로 뭘 사지?
    </SAText>
  );

  public render() {
    const { money, getOffDiff, dayRecommendItems } = this.props;

    return (
      <View style={styles.container}>
        <BasicHeader textColor="white" />
        <View style={styles.body}>
          <View style={styles.topView}>
            <SAText style={[fontStyles.anton26Pt, { color: colors.white }]}>
              1 DAY
            </SAText>
            <SAText style={[fontStyles.anton14Pt, { color: colors.dark_grey }]}>
              HOURLY PAY
            </SAText>
          </View>
          <View style={styles.bottomAbsView}>
            {getOffDiff !== 0 ? (
              <SAText
                style={[fontStyles.spoqahansans20PtB, { color: colors.white }]}
              >
                {"지옥의 회사에서 퇴근시간까지\n"}
                <SAText
                  style={[fontStyles.spoqahansans20PtB, { color: colors.red }]}
                >
                  {`${getOffDiff}시간`}
                </SAText>
                남았어요.
              </SAText>
            ) : (
              <SAText
                style={[fontStyles.spoqahansans20PtB, { color: colors.white }]}
              >
                {"회사가 아닐땐\n편히 쉬어도 좋아요"}
              </SAText>
            )}
            <View>
              <Image source={Images.img_day} style={styles.img} />
              <SAText
                style={[
                  fontStyles.anton28Pt,
                  { color: colors.white, marginTop: 44 }
                ]}
              >
                {money.toLocaleString()}
              </SAText>
              <View style={styles.whiteLine} />
              <View style={styles.wonView}>
                <SAText
                  style={[fontStyles.anton14Pt, { color: colors.dark_grey }]}
                >
                  WON
                </SAText>
              </View>
            </View>
            <FlatList
              ref={this.scrollView}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              data={Array.from(dayRecommendItems)}
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
    backgroundColor: colors.black,
    width: deviceSizes.width,
    height: deviceSizes.height
  },
  body: {
    paddingHorizontal: 32,
    flex: 1
  },
  topView: {
    marginTop: 41
  },
  bottomAbsView: {
    bottom: getBottomSpace() + 28,
    position: "absolute",
    paddingHorizontal: 32,
    width: deviceSizes.width
  },
  whiteLine: {
    backgroundColor: colors.white,
    width: deviceSizes.width - 64,
    height: 4
  },
  recommnedLine: {
    marginTop: 8
  },
  img: {
    position: "absolute",
    right: 0,
    top: 57,
    zIndex: 100
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
