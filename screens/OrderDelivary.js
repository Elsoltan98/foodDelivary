import React from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';

const OrederDelivary = () => {
  const renderMap = () => {
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}></MapView>
      </View>
    );
  };

  return <View style={{flex: 1}}>{renderMap()}</View>;
};

export default OrederDelivary;
