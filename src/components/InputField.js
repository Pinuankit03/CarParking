/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import assets from '../assets'

const Input = (props) => {
    const {
        theme, label, labelExtra, required, value, errorMessage, containerStyle, secureTextEntry,
        inputStyle, multiline, textColor, specficStyle
    } = props

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={[containerStyle]}>
            {(typeof label == 'string' && label.length > 0) &&
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 5,
                        // color: theme.text
                    }}>
                        {label}
                    </Text>
                    {labelExtra &&
                        <Text style={{
                            marginTop: 3.5,
                            maxWidth: 200,
                            fontSize: 11,
                            marginLeft: 5,
                            // color: theme.textSecondry,
                        }}>
                            ({labelExtra})
                        </Text>
                    }
                    {required == true &&
                        <IconMaterial
                            name="asterisk"
                            color="#f44336"
                            size={10}
                            style={{
                                marginTop: 4.5,
                                marginLeft: 5
                            }}
                        />
                    }
                </View>
            }

            <View style={{
                marginTop: 3,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderColor: 'grey',
                borderWidth: specficStyle ? 0 : 1,
                borderRadius: 20,
                alignItems: 'center',
            }}>
                <TextInput
                    height={40}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={assets.colors.placeholderColor}
                    {...props}
                    style={[{
                        fontSize: 16,
                        color: textColor,
                        padding: 0,
                        paddingTop: (Platform.OS == 'android' || multiline) ? 8 : 0,
                        flex: 1,
                        marginLeft: 15,
                        textAlignVertical: 'top',
                    }, inputStyle]}
                    secureTextEntry={secureTextEntry && !showPassword}
                />
                {secureTextEntry == true &&
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={{
                            paddingHorizontal: 10
                        }}
                    >
                        <IconMaterial
                            name={showPassword ? "eye" : "eye-off"}
                            color={assets.colors.placeholderColor}
                            size={20}
                        />
                    </TouchableOpacity>
                }
            </View>
            {(typeof errorMessage == 'string' && errorMessage.length > 0) &&
                <View style={{
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginTop: 2,
                    alignSelf: 'flex-start',
                    marginLeft: 10
                }}>
                    <Text style={{
                        marginLeft: 5,
                        color: "#f44336",
                        fontSize: 13,
                    }}>{errorMessage}</Text>
                </View>
            }
        </View>
    )
}

export default Input;
