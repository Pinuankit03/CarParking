import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function MapDetailScreen({route}) {
  const {lat} = route.params;
  const {long} = route.params;
  const [latitudeD, setlatitude] = useState('');
  const [longitudeD, setlongitude] = useState('');
  const [loc, setLocation] = useState(null);

  console.log("lat" , lat);
  console.log("long" ,long);

  const [region, setRegion] = useState({
    latitude:43.4643,
    longitude:-80.5204,
    latitudeDelta:2, // or 0.02
    longitudeDelta:2
  })

  console.log("latitudeD" , latitudeD);
  console.log("longitudeD" ,longitudeD);

  const currentLoc = {  latitude : latitudeD, longitude :  longitudeD}
  const destination = {  latitude : lat, longitude :  long }
  const waterloo = {  latitude : 43.4643, longitude :  -80.5204 }

  useEffect(() => {
    (async () => {
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      console.log(status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
            setlatitude(location.coords.latitude);
              setlongitude(location.coords.longitude);
      // console.log("lat data" , location.coords.latitude);
      // console.log("long data" ,location.coords.longitude);
    })();
  }, []);


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
    coordinate={currentLoc} />


    <Marker
    pinColor = "red"
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
