import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const Resturant = ({route, navigation}) => {
  const [resturant, setResturant] = React.useState(null);
  const [currentLoctaion, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    let {item, currentLoctaion} = route.params;
    setCurrentLocation(currentLoctaion);
    setResturant(item);
  }, [route.params]);

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', paddingTop: 10}}>
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
            <Text style={{...FONTS.h3}}>{resturant.name}</Text>
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

  return <SafeAreaView style={styles.container}>{renderHeader()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Resturant;
