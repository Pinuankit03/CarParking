import React,{ useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList,Image, ActivityIndicator, Pressable} from 'react-native';
import {Database} from '../Database'

function ParkingListScreen({navigation}){

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
  Database.getData(setData);
  }, []);

  const fetchData = () => {
  Database.getData(setData);
 setIsFetching(false);
}

 const onRefresh = () => {
   setIsFetching(true);
   fetchData();
 };

 const renderEmptyContainer = () => {
   return(
     <View>
     <Text style={styles.noparking}>You dont have any parking booked yet.</Text>
     </View>
   );

}

  return(
    <View style={styles.container}>
      <FlatList
        data = {data.reverse()}
        keyExtractor = { (item, index) => {return item.car_plate_no;} }

        renderItem = { ({item}) => (
          <Pressable onPress={() => {navigation.navigate('ParkingDetailScreen', { id: item.id,});}}>
            <View>
              <View style={styles.listitem}>
              <View style={styles.view}>
              <Image style={styles.image} source={require('../assets/location.png')} />
              <Text style={styles.address}> {item.street_address}</Text>

              </View>

              <View style={styles.parkingdata}>
              <Text style={styles.text}> Parking Hours: </Text>
              <Text style={styles.textData}>  Maximum {item.hours_to_park} </Text>
              </View>

              <View style={styles.parkingdata}>
              <Text style={styles.text}> Parking Date: </Text>
              <Text style={styles.textData}>  {item.parking_date} </Text>
              </View>

                <View style={styles.carPlateView} >
                  <Text style={styles.carPlate}>Car Plate No :  {item.car_plate_no} </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        onRefresh={onRefresh}
        refreshing={isFetching}
        progressViewOffset={100}
        ListEmptyComponent={renderEmptyContainer()}
        />
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
    borderColor:'#798AFF',
    borderWidth: 1,
  },
  parkingdata:{
    flexDirection: 'row',
    marginTop:8,
  },
  text:{
    fontSize:14,
    fontWeight:'bold',
  },
  textData:{
    fontSize:15,
    textAlign: 'center',
  },

  title: {
    fontSize: 20,
    color: '#123456',
    color:'white',
  },
  hourspark: {
    fontSize: 15,
    padding: 5,
    color:'black',
  },
  address: {
    fontSize: 15,
    textAlign: 'center',
    color:'black',
    fontWeight: 'bold',
  },
  carPlateView:{
    backgroundColor: '#798AFF',
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    padding: 6,
    marginTop:8,
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
noparking:{
  alignItems:'center',
  justifyContent:'center',
  fontSize:15,
},

});

export default ParkingListScreen;
