import React,{ useState, useEffect } from 'react';
import {StyleSheet, View, Text, Button, SafeAreaView, TextInput, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from 'expo-constants';
import {Database} from '../Database';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function AddParking(){
  const [carPlateNo, setcarPlateNo] = useState('')
  const [buildingCode, setbuildingCode] = useState('')
  const [parkingAddress, setparkingAddress] = useState('')
  const [suitNoHost, setsuitNoHost] = useState('')
  const [hours, setHours] = useState('1 Hour')
  const [data, setdata] = useState(null);
  const [location, setLocation] = useState(null);
  const [parkingDate, setparkingDate] = useState(new Date());
  const [geoAddress, setAddress] = useState(null);
  var currentLocation = false;
  var reverseCode = null;
  const moment = require('moment');
  var date = null;

Database.createTable();

  const onClick = () => {
    console.log("Button click");
    console.log("carPlateNo", carPlateNo);
    console.log("buildingCode", buildingCode);
    console.log("parkingAddress", parkingAddress);
    console.log("suitNoHost", suitNoHost);
    console.log("hour", hours);
    console.log("date", parkingDate);

      date = moment(parkingDate).format();
        console.log("date", date);

    if(carPlateNo == null || buildingCode == null || parkingAddress == null|| suitNoHost== null){
      Alert.alert(
        'Alert!',
        'Please enter all required data');
    }
    else if(carPlateNo.length < 2 || carPlateNo.length > 8){
      Alert.alert(
        'Alert!',
        'Please enter mininum 2 and maximum 8 character for car plate number.');
      }
      else if(buildingCode.length != 5){
        Alert.alert(
          'Alert!',
          'Please enter exactly 5 character into Building Code.');
        }
        else if(suitNoHost.length <2 || suitNoHost.length >5){
          Alert.alert(
            'Alert!',
            'Please enter mininum 2 and maximum 5 character for Suit number of Host.');
          }
          else if(parkingAddress == '' || parkingAddress == null){
            Alert.alert(
              'Alert!',
              'Please enter your parking address.');
            }

    else{
        addData(parkingAddress);
    }
     }
     //from address to lat long
     const addData  = async (add) => {
       console.log("fetch coordinates");
       let geoCode = await Location.geocodeAsync(add)
       console.log(geoCode[0].latitude);
        console.log(geoCode[0].longitude);
       Database.insertData(1,buildingCode,carPlateNo,hours,suitNoHost,parkingAddress,date,geoCode[0].latitude,geoCode[0].longitude)
       setbuildingCode('')
       setcarPlateNo('')
       setsuitNoHost('')
       setparkingAddress('')
       Alert.alert('Alert!','Parking booked Successfully');
     }


  const onLocationClick = () => {
      (async () => {
        // let { status } = await Location.requestPermissionsAsync();
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status)
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        getGeoAddress(location.coords)
      })();
   }
   const getGeoAddress = async (loc) => {
       if(loc == null) return;
        reverseCode = await Location.reverseGeocodeAsync({
         latitude : parseFloat(loc.latitude),
         longitude : parseFloat(loc.longitude)
       })
      // setparkingAddress(reverseCode)
       currentLocation = true;
       inputChangeHandler();
      // console.log(reverseCode)
   }
   const inputChangeHandler = () => {
     console.log("inputChangeHandler call");
     if (currentLocation == true) {
       console.log("reverseCode", reverseCode);
       setparkingAddress(reverseCode);
        console.log("parkingAddress", parkingAddress);
      setparkingAddress(parkingAddress[0].name + "," + parkingAddress[0].city + "," + parkingAddress[0].country);
     }else{
    setparkingAddress(parkingAddress);
   }
   console.log("get data", parkingAddress);};
   
  return(
    <SafeAreaView style={styles.sectionContainer}>
          <TextInput
            style={styles.input}
            placeholder = "Enter Car Plate no"
            placeholderTextColor = "gray"
            returnKeyType = "next"
            value = {carPlateNo}
            onChangeText = {setcarPlateNo}/>

            <TextInput
            style={styles.input}
            placeholder = "Enter Building Code"
            placeholderTextColor = "gray"
            returnKeyType = "next"
            value = {buildingCode}
            onChangeText = {setbuildingCode}/>

             <Text style={styles.text} >How many hours do you want to park? </Text>

             <DropDownPicker  items={[
                     {label: '1 Hour or Less ', value: '1 Hour'},
                     {label: '4 Hour', value: '4 Hour'},
                     {label: '12 Hour', value: '12 Hour'},
                     {label: '24 Hour', value: '24 Hour'},
                 ]}
                 defaultValue={hours}
                 containerStyle={styles.containerStyle}
                 style={{backgroundColor: '#fafafa'}}
                 itemStyle={styles.itemStyle}
                 dropDownStyle={{backgroundColor: '#fafafa'}}
                 onChangeItem={(item) => setHours(item.value)}/>

                 <TextInput
                   style={styles.input}
                   placeholder = "Enter suite No of Host"
                   placeholderTextColor = "gray"
                   returnKeyType = "next"
                   value = {suitNoHost}
                   onChangeText = {setsuitNoHost} />
                  <Text style={styles.text}> Parking Address </Text>
                  <TextInput
                    style={styles.input}
                    placeholder = "Enter Parking Address"
                    placeholderTextColor = "gray"
                    returnKeyType = "next"
                    onChangeText={(text) => setparkingAddress(text)}
                    onChange={inputChangeHandler}
                    value={parkingAddress}
                    multiline={true}
                    underlineColorAndroid='transparent' />

                    <Text style={styles.textOR} > OR </Text>

                    <View style={styles.buttonLoc}>
                    <Button color= '#FFFFFF' onPress={onLocationClick} title="Use Current Location"></Button>
                    </View>

                    <View style={styles.buttonAdd}>
                      <Button color= '#FFFFFF' fontWeight = 'bold' onPress={onClick} title="Add Parking"></Button>
                    </View>

</SafeAreaView>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  input:{
    height: 40,
    margin:15,
    borderColor:'gray',
    padding:5,
    borderWidth: 1,
    borderRadius: 4,

  },
  containerStyle:{
    margin:15,
    height: 40,
    backgroundColor: '#fafafa',
},
itemStyle:{
    justifyContent: 'flex-start'
},
text:{
  margin:15,
},
textOR:{
  color: 'red',
  textAlign: 'center',
  marginTop:10,
},
buttonLoc:{
  backgroundColor: '#20263c',
  borderRadius: 4,
    margin:15,

},
buttonAdd:{
  backgroundColor: '#798AFF',
  borderRadius: 4,
  width: '90%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 15,
  position: 'absolute',
  bottom: 10,
},
});


export default AddParking;
