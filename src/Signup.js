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
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from './components/InputField';

import preferences from './common/preferences';
import assets from './assets';
import AsyncStorage from '@react-native-community/async-storage';

// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'UserDatabase.db' });
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb')
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const Signup = (props) => {
    const { navigation, theme, language, setLanguage } = props

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


    function validate() {
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
        if (password.length == 0) {
            setPasswordError('Please enter password')
            return false
        }
        if (confirmPassword.length == 0) {
            setConfirmPasswordError('Please confirm password')
            return false
        }
        if (!isConfirmed) {
            setConfirmPasswordError('Please confirm password')
            return false
        }
        return true
    }

    function onSignupPress() {
        setLoading(true)
        // db.transaction(function (tx) {
        //     tx.executeSql(
        //         'INSERT INTO table_user (user_name, user_email, user_contact, user_carPlateNumber, user_password) VALUES (?,?,?,?,?)',
        //         [name, email, contactNumber, carPlateNumber, password],
        //         (tx, results) => {
        //             console.log('Results', results.rowsAffected);
        //             // AsyncStorage.setItem('userId', );
        //             if (results.rowsAffected > 0) {
        //                 Alert.alert(
        //                     'Success',
        //                     'You are Registered Successfully',
        //                     [
        //                         {
        //                             text: 'Ok',
        //                             onPress: () => navigation.navigate('Profile'),
        //                         },
        //                     ],
        //                     { cancelable: false }
        //                 );
        //                 setLoading(false)
        //             } else {
        //                 alert('Registration Failed');
        //                 setLoading(false)
        //             }
        //         }
        //     );
        // });
        db.transaction(tx => {
            tx.executeSql('INSERT INTO table_user (user_name, user_email, user_contact, user_carPlateNumber, user_password) values (?,?,?,?,?)', [name, email, contactNumber, carPlateNumber, password],
                (txObj, resultSet) => {
                    // this.setState({
                    //     data: this.state.data.concat(
                    //         { id: resultSet.insertId, text: 'gibberish', count: 0 })
                    // })
                    AsyncStorage.setItem('userId', JSON.stringify(resultSet.insertId));
                    Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('HomeScreen', {
                                    user_id: resultSet.insertId
                                }),
                            },
                        ],
                        { cancelable: false }
                    );
                    console.log('Signup', 'resultSet', resultSet.insertId);
                    setLoading(false)
                    setName('')
                    setEmail('')
                    setPassword('')
                    setContactNumber('')
                    setConfirmPassword('')
                    setCarPlateNumber('')

                },
                (txObj, error) => {
                    console.log('Error', error)
                    setLoading(false)
                })
        })
    }
    function isValidPhone(phone) {
        return /\D/gi.test(phone) ? '' : phone
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <View style={{
                flex: 1,
                marginVertical: 50,
                marginHorizontal: 25,
                justifyContent: 'center'
            }}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Signup</Text>
                </View>
                <Input
                    placeholder={'Name'}
                    keyboardType="default"
                    onChangeText={(text) => {
                        setName(text)
                        setNameError('')
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                    editable={!loading}
                    value={name}
                    errorMessage={nameError}
                />
                <Input
                    placeholder={'Email'}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        setEmail(text)
                        setEmailError('')
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                    editable={!loading}
                    value={email}
                    errorMessage={emailError}
                />
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
                        marginTop: 10
                    }}
                    editable={!loading}
                    value={contactNumber}
                    errorMessage={contactNumberError}
                />
                <Input
                    placeholder={'Car Plate Number'}
                    keyboardType="default"
                    onChangeText={(text) => {
                        setCarPlateNumber(text)
                        setCarPlateNumberError('')
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                    editable={!loading}
                    value={carPlateNumber}
                    errorMessage={carPlateNumberError}
                />
                <Input
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                        setPasswordError('')
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                    editable={!loading}
                    textColor={passwordText}
                    value={password}
                    errorMessage={passwordError}
                    onBlur={() => {
                        if (confirmPassword.length > 0) {
                            if (confirmPassword == password) {
                                setIsConfirmed(true);
                                setPasswordText('black');
                                setConfirmPasswordText('black')
                                setConfirmPasswordError('')
                                setPasswordError('')
                            }
                            else {
                                setIsConfirmed(false);
                                setPasswordText('red');
                                setPasswordError('Please confirm password')
                            }
                        }
                    }}
                />
                <Input
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                        setConfirmPasswordError('')
                    }}
                    containerStyle={{
                        marginTop: 10
                    }}
                    editable={!loading}
                    textColor={confirmPasswordText}
                    value={confirmPassword}
                    errorMessage={confirmPasswordError}
                    onBlur={() => {
                        if (confirmPassword == password) {
                            setIsConfirmed(true);
                            setPasswordText('black');
                            setConfirmPasswordText('black')
                            setConfirmPasswordError('')
                            setPasswordError('')
                        }
                        else {
                            setIsConfirmed(false);
                            setConfirmPasswordText('red');
                            setConfirmPasswordError('Please confirm password')
                        }
                    }}
                />
                <TouchableOpacity
                    disabled={loading}
                    onPress={() => {
                        if (validate()) {
                            onSignupPress()
                        }
                    }}
                    style={{
                        marginTop: 25,
                        backgroundColor: assets.colors.appColor,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {loading ? (
                        <ActivityIndicator animating={true} color={'white'} size='small' />
                    ) : (
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Signup</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Auth')
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        // marginTop: 40,
                        alignSelf: 'center'
                    }}>
                    <Text style={{
                        fontSize: 15,
                        color: 'black',

                    }}>Already have an account? <Text style={{
                        color: assets.colors.appColor
                    }}>Sign-in</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView >
    );
};

const styles = StyleSheet.create({});



export default Signup;
