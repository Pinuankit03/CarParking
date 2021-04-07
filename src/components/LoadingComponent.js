
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
// import assets from '../assets';

const Loading = (props) => {
    const { theme, visible } = props

    if (!visible) {
        return null;
    }

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: '#00000044',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItem: 'center',
            justifyContent: 'center',
        }}>
            <ActivityIndicator color={'white'} size='large' />
        </View>
    )
}

export default Loading;
