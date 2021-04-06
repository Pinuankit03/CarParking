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
import Input from '../components/InputField';

import preferences from '../common/preferences';
import assets from '../assets';
import AsyncStorage from '@react-native-community/async-storage';
// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'UserDatabase.db' });
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb')
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const Login = (props) => {
    const { navigation, theme, language, setLanguage } = props

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    function validate() {
        EMAIL_REGEX.lastIndex = 0;
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
        if (password.length == 0) {
            setPasswordError('Please enter password')
            return false
        }

        return true
    }

    function onLoginPress() {
        setLoading(true)
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_user where user_email = ?',
                [email],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        let res = results.rows.item(0);
                        console.log('results', results);
                        console.log('res', res.user_password);
                        if (password == res?.user_password) {
                            AsyncStorage.setItem('userId', res.user_id);
                            Alert.alert(
                                'Success',
                                'Login Successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            navigation.navigate('Profile', {
                                                userId: res.user_id
                                            })
                                        },
                                    },
                                ],
                                { cancelable: false }
                            );
                            setLoading(false)
                            setEmail('')
                            setPassword('')
                        }
                        else {
                            alert('Incorrect Password!');
                            setLoading(false)
                        }

                    } else {
                        console.log('Login', 'res', results);
                        alert('No user found');

                        setLoading(false)
                    }
                }
            );
        });

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
                        fontFamily: 'bold',
                    }}>Log In</Text>
                </View>
                <Input
                    placeholder={'Email'}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        setEmail(text)
                        setEmailError('')
                    }}
                    containerStyle={{
                        marginTop: 30
                    }}
                    editable={!loading}
                    value={email}
                    errorMessage={emailError}
                />

                <Input
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                        setPasswordError('')
                    }}
                    containerStyle={{
                        marginTop: 20
                    }}
                    editable={!loading}
                    value={password}
                    errorMessage={passwordError}
                />
                {/* <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: Fonts.Bold,
                    }}>FORGOT PASSWORD?</Text>
                </View> */}
                <TouchableOpacity
                    disabled={loading}
                    onPress={() => {
                        if (validate()) {
                            onLoginPress()
                        }
                    }}
                    style={{
                        marginTop: 40,
                        backgroundColor: assets.colors.appColor,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {loading ? (
                        <ActivityIndicator animating={true} color={'white'} size='small' />
                    ) : (
                        <Text style={{
                            fontSize: 16,
                            fontFamily: 'bold',
                            color: 'white'
                        }}>LOGIN</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}
                    style={{
                        // position: 'absolute',
                        // bottom: 40,
                        marginTop: 100,
                        alignSelf: 'center'
                    }}>
                    <Text style={{
                        fontSize: 15,
                        color: 'black',


                    }}>Don't have an account? <Text style={{
                        color: assets.colors.appColor
                    }}>Signup</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView >
    );
};

const styles = StyleSheet.create({});



export default Login;
