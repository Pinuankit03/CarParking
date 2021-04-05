import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

function MapDetailScreen() {
  const [region, setRegion] = useState({
    latitude:43.4643,
    longitude:-80.5204,
    latitudeDelta:2, // or 0.02
    longitudeDelta:2
  })

const waterloo = {latitude:43.4643,  longitude:-80.5204 }
const toronto = {latitude:43.6532,  longitude:-79.3832}

  return (
    <View style={styles.container}>
    <MapView
    showsUserLocation={true}
    region = {region}
    style={styles.map}>

    <Marker
    pinColor = "green"
    title = "Waterloo"
    description = "This is my current location"
    coordinate={waterloo} />

    <Marker
    pinColor = "red"
    title = "Toronto"
    description = "This is my current location"
    coordinate={toronto} />

    <Polyline
    strokeColor = "red"
    strokeWidth = {5}
     coordinates = {[waterloo, toronto]}/>


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
