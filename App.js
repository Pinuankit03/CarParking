//Student ID - 101334143
//Student - Manisha Bathula
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/SignInScreen';
import HomeScreen from './src/HomeScreen';
import AddParking from './src/AddParking';
import ParkingDetailScreen from './src/ParkingDetailScreen';
import MapDetailScreen from './src/MapDetailScreen';
import Auth from './src/Login';
import Signup from './src/Signup';
import Profile from './src/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb')
const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
export default function App() {
  const [userId, setUserId] = useState('')
  useEffect(() => {

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(20), user_contact VARCHAR(12), user_carPlateNumber VARCHAR(20), user_password VARCHAR(20))',
              []
            );
          }
        }
      );
    });
    var userId_temp;
    async function getId() {
      userId_temp = await AsyncStorage.getItem('userId')
      await setUserId(await AsyncStorage.getItem('userId'))
      console.log('App', 'Const-UserId', userId)
    }
    getId()
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="HomeScreen"
          component={HomeScreen}  />
        <Stack.Screen name="AddParking" component={AddParking} options={{ title: 'Add Parking' }} />
        <Stack.Screen name="ParkingDetailScreen" component={ParkingDetailScreen} options={{ title: ' ' }} />
        <Stack.Screen name="MapDetailScreen" component={MapDetailScreen} options={{ title: 'Route' }} />
        <Stack.Screen name="SignIn"
          component={SignInScreen} />
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
  image: {
    width: 40,
    height: 40,
    marginLeft: 15,
  }
});
