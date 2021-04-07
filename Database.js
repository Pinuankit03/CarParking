//Student ID - 101334143
//Student - Manisha Bathula
import React,{useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.carparking');

const createTable = async () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists parking (id INTEGER primary key not null, user_id INTEGER, building_code TEXT, car_plate_no TEXT, hours_to_park TEXT, suiteno TEXT, street_address TEXT, parking_date TEXT, latitude DOUBLE, longitude DOUBLE)');
    });
  })
}

const getData = (setData) => {
  db.transaction(tx => {
    tx.executeSql(
      'select * from parking ORDER BY id DESC;',null,
      (_, { rows: { _array } }) => setData(_array),
      (_, error) => onError
    );
    });
    //getAllData();
}

// const getAllData = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'select * from parking;',null,
//       (_, result) => {
//         console.log(result);
//       },
//       (_, error) => {
//         console.log(console.error());
//       }
//     );
//     });
// }


const insertData = (userid,buildingCode,carPlateNo,hours,suitNoHost,parkingAddress,parkingdate,latitude,longitude) => {
  db.transaction(
    tx => {
 tx.executeSql('INSERT INTO parking (user_id, building_code, car_plate_no, hours_to_park, suiteno, street_address, parking_date, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?)',[userid,buildingCode,carPlateNo,hours,suitNoHost,parkingAddress,parkingdate,latitude,longitude]);
    },
    null
  );
}
const getDataById = (user_id,setData) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM parking where user_id = ? ORDER BY id DESC', [user_id],
      (_, { rows: { _array } }) => setData(_array),
      (_, error) => onError
      );
    });
}

const getDataByParkingId = (id,setItems) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM parking where id = ?', [id],
      (_, { rows: { _array } }) => setItems(_array),
      (_, error) => onError
      );
    });
}

const onError = (_, error) => {
    console.log(error);
}

export const Database = {
    createTable,
    insertData,
    getData,
    getDataById,
    getDataByParkingId,
}
