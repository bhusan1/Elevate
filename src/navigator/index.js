import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';

import {TabNavigator} from './TabNavigator';
import {
    About, Brazilian, SignInScreen, SignUpScreen, ResetPasswordScreen,
} from '../screens';

const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export const AppNavigator = () => {

    const theme = useTheme();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'UserBoard'}
            >
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        headerBackTitle:'Home'
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                />
                <Stack.Screen
                    name="UserBoard"
                    component={TabNavigator}
                    options={{
                        header: () => null,
                    }}
                />
                 <Stack.Screen
                    name="About"
                    component={About}
                    options={{
                        headerBackTitle:'Home',
                        headerTitle:'About Us'
                    }}
                />
                 <Stack.Screen
                    name="Brazilian"
                    component={Brazilian}
                    options={{
                        headerBackTitle:'Home',
                        headerTitle:'Brazilian Blowout'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
