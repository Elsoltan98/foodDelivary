import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Resturant, Home, OrderDelivary} from './screens/index';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Resturant" component={Resturant} />
        <Stack.Screen name="OrderDelivary" component={OrderDelivary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
