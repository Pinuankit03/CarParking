import React,{ useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList,Image, ActivityIndicator, Pressable} from 'react-native';
import {Database} from '../Database'

function ParkingListScreen({navigation}){

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

   useEffect(() => {
  Database.getData(setData);
 }, []);

  return(
    <View style={styles.container}>
      <FlatList
        data = {data}
        keyExtractor = { (item, index) => {return item.car_plate_no;} }
        renderItem = { ({item}) => (
          <Pressable onPress={() => {navigation.navigate('ParkingDetailScreen', { id: item.id,});}}>

            <View>
              <View style={styles.listitem}>
              <View style={styles.view}>
              <Image style={styles.image} source={require('../assets/location.png')} />
              <Text style={styles.address}> {item.street_address}</Text>

              </View>
                <Text style={styles.hourspark}> Parking Hours:  Maximum {item.hours_to_park} </Text>
                <Text style={styles.hourspark}> Parking Date:  fix </Text>
                <View style={styles.carPlateView} >
                  <Text style={styles.carPlate}>Car Plate No :  {item.car_plate_no} </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )

      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  thumb: {
    width: '90%',
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  listitem: {
    flexDirection: 'column',
    borderRadius:4,
    backgroundColor: 'white',
    width: '95%',
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    marginTop:5,
    borderColor:'#798AFF',
    borderWidth: 1,

  },
  title: {
    fontSize: 20,
    color: '#123456',
    color:'white',
  },
  hourspark: {
    fontSize: 15,
    padding: 10,
    color:'black',
  },
  address: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color:'black',
    fontWeight: 'bold',
  },
  carPlateView:{
    backgroundColor: '#798AFF',
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    padding: 6,
    alignItems:'center',
},
image:{
  height:28,
  width:21,
  marginLeft:10,
  tintColor:'black',
},
view:{
  height:50,
  borderRadius: 4,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
},
carPlate:{
fontSize: 15,
color:'white',
},

});

export default ParkingListScreen;
