//Student ID - 101334143
//Student - Manisha Bathula

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function MapDetailScreen({navigation,route}) {
  const {lat} = route.params;
  const {long} = route.params;
  const [latitudeD, setlatitude] = useState(0.0);
  const [longitudeD, setlongitude] = useState(0.0);
  const [loc, setLocation] = useState(null);

  console.log("lat" , lat);
  console.log("long" ,long);

  const [region, setRegion] = useState({
    latitude:43.4643,
    longitude:-80.5204,
    latitudeDelta:2, // or 0.02
    longitudeDelta:2
  })

  useEffect(() => {
    (async () => {
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      console.log(status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
      setLocation(location);
      console.log("location get ", location);
      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);
      // console.log("lat data" , location.coords.latitude);
      // console.log("long data" ,location.coords.longitude);
    })();
  }, []);

  const defaultCoordinates = {  latitude : 43.6532, longitude :  -79.3832 }
  const currentLoc = {  latitude : latitudeD, longitude :  longitudeD}
  const destination = {  latitude : lat, longitude :  long }
  console.log("latitudeD" , latitudeD);
  console.log("longitudeD" ,longitudeD);

      // <MapViewDirections
      //    origin={currentLoc}
      //    destination={destination}
      //    apikey={GOOGLE_MAPS_APIKEY}
      //  />

  return (
    <View style={styles.container}>
    <MapView
    showsUserLocation={true}
    region = {region}
    onRegionChangeComplete = {setRegion}
    style={styles.map}>

    <Marker
    pinColor = "red"
    title = "Current Location"
    description = "Current Location"
    coordinate={loc != null ? currentLoc : defaultCoordinates }/>

    <Marker
    pinColor = "blue"
    title = "Destination"
    description = "Destination Location"
    coordinate={destination} />

    <Polyline
    strokeColor = "red"
    strokeWidth = {5}
     coordinates = {[currentLoc, destination]}/>

    </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
});

 export default MapDetailScreen;
