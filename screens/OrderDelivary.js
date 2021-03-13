import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS, GOOGLE_API_KEY, icons} from '../constants';
import MapViewDirections from 'react-native-maps-directions';

const OrederDelivary = ({route, navigation}) => {
  const [resturants, setResturants] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  React.useEffect(() => {
    let {resturants, currentLocation} = route.params;

    let fromLoc = currentLocation.gps;
    let toLoc = resturants.location;
    let street = resturants.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setResturants(resturants);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [route.params]);

  const renderMap = () => {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{width: 25, height: 25, tintColor: COLORS.white}}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker coordinate={fromLocation} anchor={{x: 0.5, y: 0.5}} flat={true}>
        <Image source={icons.car} style={{width: 40, height: 40}} />
      </Marker>
    );
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  };

  if (!resturants || !toLocation || !fromLocation) {
    return (
      <ActivityIndicator
        color={COLORS.primary}
        size="large"
        style={{flex: 1}}
      />
    );
  }

  return <View style={{flex: 1}}>{renderMap()}</View>;
};

export default OrederDelivary;
