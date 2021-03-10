import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const Resturant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [resturants, setResturants] = React.useState(null);
  const [currentLoctaion, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    let {item, currentLoctaion} = route.params;
    setCurrentLocation(currentLoctaion);
    setResturants(item);
  }, [route.params]);

  const editOrder = (action, menuId, price) => {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId === menuId);
    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId,
          qty: 1,
          price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  };

  const getOrderQty = (menuId) => {
    let orderItem = orderItems.filter((a) => a.menuId === menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={{width: 30, height: 30}} />
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h3}}>{resturants.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image source={icons.list} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {resturants.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              {/** Images */}
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />
              {/** Quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -25,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => editOrder('-', item.menuId, item.price)}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder('+', item.menuId, item.price)}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>

              {/** Name & Description */}

              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2,
                }}>
                <Text
                  style={{
                    marginVertical: 15,
                    textAlign: 'center',
                    ...FONTS.h2,
                  }}>
                  {item.name} - {item.price.toFixed(2)} $
                </Text>
                <Text style={{...FONTS.body3, textAlign: 'center'}}>
                  {item.description}
                </Text>
              </View>

              {/** Calories */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={icons.fire}
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                  {item.calories.toFixed(2)} cal
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPostion = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: SIZES.padding,
          }}>
          {resturants.menu.map((item, index) => {
            const opacity = dotPostion.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPostion.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPostion.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const getBasketItemCount = () => {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  };

  const renderOrder = () => {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3}}>
              {getBasketItemCount()} Items in cart:{' '}
            </Text>
            <Text style={{...FONTS.h3}}>$45</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                Location
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>8888</Text>
            </View>
          </View>

          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Check if resturants && current location

  if (!resturants && !currentLoctaion) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Resturant;
