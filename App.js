import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/SignInScreen';
import HomeScreen from './src/HomeScreen';
import AddParking from './src/AddParking';
import ParkingDetailScreen from './src/ParkingDetailScreen';
import MapDetailScreen from './src/MapDetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen"
      screenOptions = {{
        headerStyle: {backgroundColor: 'white',},
        headerTintColor: '#20263c',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>

        <Stack.Screen name="SignIn"
        component={SignInScreen}
        initialParams={{email: "jk"}}
        options={ ({route}) => ({email: route.params.email}) }/>

        <Stack.Screen name="HomeScreen"
        component={HomeScreen}
        initialParams={{username: "JK"}}
        options={ ({route}) => ({username: route.params.username}),
        (
            {navigation}) => (
              { headerRight: () => (
                <Ionicons name="power-outline"
              style={styles.image}
                color="#798AFF" />
                // <Button title="LogOut" color="#000" onPress={() => navigation.replace('SignIn')}/>
              )}
            )
        } />
        <Stack.Screen name="AddParking" component={AddParking} options={{title: 'Add Parking'}} />
        <Stack.Screen name="ParkingDetailScreen" component={ParkingDetailScreen} options={{title: 'Parking Detail'}} />
        <Stack.Screen name="MapDetailScreen" component={MapDetailScreen} options={{title: 'Route Detail'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 40,
    height: 40,
    marginLeft: 15,
  }
});
