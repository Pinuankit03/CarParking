
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import assets from '../assets';
import PopoverTooltip from 'react-native-popover-tooltip';
import AsyncStorage from '@react-native-community/async-storage';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb')
const Header = (props) => {
    const { theme, onEditPress, items, headerTitle, editText, userId, onDeleteUser, onLogout, showOption } = props

    // function onDeleteUser() {

    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             'DELETE FROM  table_user where user_id=?',
    //             [userId],
    //             (tx, results) => {
    //                 console.log('Results', results.rowsAffected);
    //                 if (results.rowsAffected > 0) {
    //                     Alert.alert(
    //                         'Success',
    //                         'User deleted successfully',
    //                         [
    //                             {
    //                                 text: 'Ok',
    //                                 onPress: () => navigation.navigate('Auth'),
    //                             },
    //                         ],
    //                         { cancelable: false }
    //                     );
    //                 } else {
    //                     alert('Some other error happen');
    //                 }
    //             }
    //         );
    //     });
    //     clearAuthSession();

    // }
    // function onLogout() {
    //     clearAuthSession();
    // }
    // async function clearAuthSession() {
    //     await AsyncStorage.clear();
    //     navigation.navigate('Auth')
    // }
    return (
        <>
            <View style={{
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
                }}>{headerTitle}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {editText &&
                        <TouchableOpacity
                            style={{
                                marginRight: 20
                            }}
                            onPress={onEditPress}>
                            <Text style={{
                                color: assets.colors.appColor,
                                fontSize: 16,

                            }}>{editText}</Text>
                        </TouchableOpacity>
                    }
                    {showOption &&
                        <PopoverTooltip
                            labelContainerStyle={{
                                width: 140,
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
                                    onPress: () => onLogout()
                                },
                                {
                                    label: 'Delete Account',
                                    onPress: () => onDeleteUser()
                                },

                            ]}
                        />
                    }
                </View>
            </View>
            <View style={{
                height: 1,
                backgroundColor: assets.colors.appColor,
                marginTop: 5
            }} />
        </>
    )
}

export default Header;
