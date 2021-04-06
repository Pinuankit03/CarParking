import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import _ from 'lodash'
import { LogBox } from 'react-native';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';

import LoadingComponent from '../components/LoadingComponent';
// import preferences from '../common/preferences';


LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
enableScreens();

const AuthStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

const RootNavigator = (props) => {

    const [loading, setLoading] = useState(true)

    async function onMount() {

        try {
            setLoading(true)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        onMount()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName='Auth'>
                {loading ? (
                    <Stack.Screen name="Loading" component={LoadingComponent} />
                ) :
                    <>
                        <Stack.Screen name="Auth" component={AuthStack} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="Profile" component={Profile} />
                    </>
                    //  _.isNil(user) ? (
                    //     <>
                    //         <Stack.Screen name="Auth" component={AuthStack} />

                    //     </>
                    // ) : (
                    //     <>
                    //     </>
                    // )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default RootNavigator;
