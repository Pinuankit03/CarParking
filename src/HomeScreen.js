import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParkingListScreen from './ParkingListScreen';
import AddParking from './AddParking';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function HomeScreen({route}){
  return(
    <Tab.Navigator
      screenOptions={ ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'ParkingListScreen'){
            iconName = focused ? 'list' : 'list-outline';

          }else if (route.name === 'AddParking'){
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          else if (route.name === 'Profile'){
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })
      }
      tabBarOptions={{
        activeTintColor: '#798AFF',
        inactiveTintColor: 'gray',
      }}


    >
      <Tab.Screen name="ParkingListScreen" component={ParkingListScreen} />
      <Tab.Screen name="AddParking" component={AddParking}  />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
