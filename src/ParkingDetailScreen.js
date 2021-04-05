import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Database} from '../Database'

function ParkingDetailScreen({navigation,route}) {
const {id} = route.params;
const [location, setLocation] = useState(null);
const [error, setError] = useState(null);

const onClick = (latitude, longitude) => {
  console.log("Button click");
  navigation.navigate('MapDetailScreen', { lat: items[0].latitude, long: items[0].longitude,});
}

const [items, setItems] = useState(null);
Database.getDataById(id,setItems)
if (items === null || items.length === 0) {
  return null;
}
return(
  <View
  style={styles.container}>
  {
    items.map(({ building_code, car_plate_no,hours_to_park, id,latitude, longitude, parking_date, street_address, suiteno, user_id }) => (

<View>
<Text style={styles.detail}>Parking Detail</Text>
<View style={styles.view}>
<Image style={styles.image} source={require('../assets/location.png')} />
<Text style={styles.address}>{street_address}</Text>
</View>

<View style={styles.car}>
<Text style={styles.cartext}> Car plate No : {car_plate_no} </Text>
 </View>

 <View style={styles.parkingdata}>
 <Text style={styles.text}> Building Code </Text>
 <Text style={styles.textData}> {building_code} </Text>
 </View>

 <View style={styles.parkingdata}>
 <Text style={styles.text}> Parking Date </Text>
 <Text style={styles.textData}> {parking_date} </Text>
 </View>

 <View style={styles.parkingdata}>
 <Text style={styles.text}> Suit No of Host </Text>
 <Text style={styles.textData}> {suiteno} </Text>
 </View>

 <Text style={styles.carpark}> You can park your Car till {hours_to_park} </Text>

 <View style={styles.buttonView}>
   <Button fontWeight= 'bold' color= '#FFFFFF' onPress={onClick} title="View your Parking Location" ></Button>
 </View>

</View>
    ))
  }

  </View>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingTop: 18,
  },
  image:{
    height:28,
    width:21,
    marginLeft:10,
  },
  view:{
    height:50,
    backgroundColor: "#20263c",
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  car:{
    height:50,
    backgroundColor: "#D1D1D6",
    borderRadius: 4,
    width: '100%',
    marginTop:10,
    alignItems: 'center',
    justifyContent:'center',
  },
  cartext:{
      fontSize: 18,
  },
  parkingdata:{
    flexDirection: 'row',
    marginTop:25,
  },
  text:{
    fontSize:18,
    marginTop:5,
    fontWeight:'bold'
  },
  carpark:{
    fontSize:18,
    marginTop:40,
    fontWeight:'bold',
    color:'red',
    alignItems:'center',
  },
  textData:{
    fontSize:15,
    borderRadius: 4,
    borderColor: 'gray',
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    borderWidth:1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
  },
  address:{
    marginLeft:10,
    color : "white",
    fontSize: 18,
  },
  buttonView:{
    backgroundColor: '#798AFF',
    borderRadius: 4,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:25,

  },
  detail:{
fontSize:20,
color:'#20263c',
fontWeight:'bold',
justifyContent: 'center',
marginBottom:10,

  },

});

 export default ParkingDetailScreen;
