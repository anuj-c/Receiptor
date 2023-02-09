import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Form from './Screens/Form';
import Table from './Screens/Table';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Form"
          component={Form}
          options={{
            headerTransparent: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Table"
          component={Table}
          options={{
            title: 'Invoice',
            headerTransparent: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
