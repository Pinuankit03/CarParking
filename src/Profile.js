//Student ID - 101334143
//Student - Manisha Bathula

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from './components/InputField';
import Header from './components/HeaderComponent';
import preferences from './common/preferences';
import assets from './assets';
import PopoverTooltip from 'react-native-popover-tooltip';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'UserDatabase.db' });
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native';
const db = SQLite.openDatabase('db.testDb')
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const Profile = (props) => {
  const navigation = useNavigation();
  const { theme, language, setLanguage, route, userId } = props

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [carPlateNumber, setCarPlateNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(true)
  const [passwordText, setPasswordText] = useState('black')
  const [confirmPasswordText, setConfirmPasswordText] = useState('black')
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [contactNumberError, setContactNumberError] = useState('')
  const [carPlateNumberError, setCarPlateNumberError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [editText, setEditText] = useState('Edit')
  const [editable, setEditable] = useState(false)
  const [inputUserId, setInputUserId] = useState(1)

  useEffect(() => {

    // const userId = route?.params?.userId ? route.params.userId : null
    console.log('Profile', 'Const-UserId', userId)
    // async function getId() {
    //   await setInputUserId(await AsyncStorage.getItem('userId'))
    //   console.log('Profile', 'Const-UserId', userId)
    // }
    // getId()
    setInputUserId(userId)
    getUser(userId)


  }, [])
  function validate() {
    console.log('call');
    EMAIL_REGEX.lastIndex = 0;
    if (name.length == 0) {
      setNameError('Please enter name')
      return false
    }
    if (email.length == 0) {
      setEmailError('Please enter email')
      return false
    }
    if (email.length > 0) {
      if (!EMAIL_REGEX.test(email)) {
        setEmailError('Please enter valid email')
        return false
      }
    }
    if (contactNumber.length == 0) {
      setContactNumberError('Please enter contact number')
      return false
    }
    if (contactNumber.length < 9 || contactNumber.length > 10) {
      setContactNumberError('Please enter valid phone number')
      return false
    }
    if (carPlateNumber.length == 0) {
      setCarPlateNumberError('Please enter car plate number')
      return false
    }
    if (carPlateNumber.length < 3 || carPlateNumber.length > 8) {
      setCarPlateNumberError('Please enter valid car plate number')
      return false
    }

    return true
  }


  function OnSaveClick() {
    console.log('call OnSaveClick');
    setLoading(true)
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user SET user_name=?, user_email=?, user_contact=? , user_carPlateNumber=? where user_id=?',
        [name, email, contactNumber, carPlateNumber, inputUserId],
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => { },
                },
              ],
              { cancelable: false }
            );
            setLoading(false)
          } else {
            alert('Updation Failed');
            setLoading(false)
          }
        }
      );
    });
  }
  function isValidPhone(phone) {
    return /\D/gi.test(phone) ? '' : phone
  }
  function onEditPress() {
    if (editText == 'Edit') {
      setEditText('Save')
      setEditable(true)
    }
    else {
      if (validate()) {
        OnSaveClick()
      }
      setEditText('Edit')
      setEditable(false)
    }
  }
  function getUser(userId) {
    setLoading(true)
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [userId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            console.log('Profile', 'getUser', res);
            setName(res.user_name)
            setEmail(res.user_email)
            setContactNumber(res.user_contact)
            setCarPlateNumber(res.user_carPlateNumber)
            setLoading(false)

          } else {
            alert('No user found');
            setName('')
            setEmail('')
            setContactNumber('')
            setCarPlateNumber('')
            setLoading(false)
          }
        }
      );
    });
  };
  function onDeleteUser() {
    console.log('call onDeleteUser');
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Auth'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Some other error happen');
          }
        }
      );
    });
    clearAuthSession();

  }
  function onLogout() {
    clearAuthSession();
  }
  async function clearAuthSession() {
    await AsyncStorage.clear();
    navigation.navigate('Auth')
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
          marginTop:30,
      }}
    >
      <View style={{
        flex: 1,
        marginBottom: 30,
        marginTop: 30
        // justifyContent: 'center'
      }}>
        {/* <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20
        }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: assets.colors.appColor,
            alignSelf: 'center',
            marginLeft: 20
          }}>Profile</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{
                marginRight: 20
              }}
              onPress={() => {
                onEditPress()
              }}>
              <Text style={{
                color: assets.colors.appColor,
                fontSize: 16,

              }}>{editText}</Text>
            </TouchableOpacity>
            <PopoverTooltip
              labelContainerStyle={{
                width: 130,
              }}
              buttonComponent={
                <View style={{
                  padding: 5,
                }}>
                  <Image source={assets.icons.setting}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                    }} />
                </View>
              }
              items={[
                {
                  label: 'Logout',
                  onPress: () => { onLogout() }
                },
                {
                  label: 'Delete Account',
                  onPress: () => { onDeleteUser() }
                },

              ]}
            />
          </View>
        </View> */}
        {/* <View style={{
          height: 1,
          backgroundColor: assets.colors.appColor,
          marginTop: 5
        }} /> */}
        <Header
          headerTitle={'Profile'}
          editText={editText}
          onEditPress={onEditPress}
          userId={userId}
          onDeleteUser={onDeleteUser}
          onLogout={onLogout}
          showOption={true}
        />
        <View style={{ marginHorizontal: 25, }}>
          <Text style={[styles.textView, {
            marginTop: 50
          }]}>Name</Text>
          <Input
            placeholder={'Name'}
            keyboardType="default"
            onChangeText={(text) => {
              setName(text)
              setNameError('')
            }}
            containerStyle={{
              marginTop: 5
            }}
            value={name}
            errorMessage={nameError}
            editable={editable}
            specficStyle={editable ? false : true}
          />
          <Text style={styles.textView}>Email</Text>
          <Input
            placeholder={'Email'}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text)
              setEmailError('')
            }}
            containerStyle={{
              marginTop: 5
            }}
            editable={!loading}
            value={email}
            errorMessage={emailError}
            editable={editable}
            specficStyle={editable ? false : true}
          />
          <Text style={styles.textView}>Contact Number</Text>
          <Input
            placeholder={'Contact Number'}
            keyboardType="numeric"
            onChangeText={(text) => {

              if (isValidPhone(text)) {
                setContactNumber(text)
              }
              else if (text.length == 0) {
                setContactNumber('')
              }
              setContactNumberError('')
            }}
            containerStyle={{
              marginTop: 5
            }}
            editable={!loading}
            value={contactNumber}
            errorMessage={contactNumberError}
            editable={editable}
            specficStyle={editable ? false : true}
          />
          <Text style={styles.textView}>Car Plate Number</Text>
          <Input
            placeholder={'Car Plate Number'}
            keyboardType="default"
            onChangeText={(text) => {
              setCarPlateNumber(text)
              setCarPlateNumberError('')
            }}
            containerStyle={{
              marginTop: 5
            }}
            editable={!loading}
            value={carPlateNumber}
            errorMessage={carPlateNumberError}
            editable={editable}
            specficStyle={editable ? false : true}
          />
        </View>
      </View>
    </KeyboardAwareScrollView >
  );
};

const styles = StyleSheet.create({
  textView: {
    fontSize: 16,
    color: 'black',
    marginTop: 10
  }
});



export default Profile;
