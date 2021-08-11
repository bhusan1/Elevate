import React from 'react';
import {StatusBar} from "react-native";
import {useTheme} from 'react-native-paper';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import {HomeScreen, BookScreen, SettingsScreen, Services } from '../screens';
import {TabBar} from "./TabBar";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    const theme = useTheme();
    const route = useRoute();
    const routeName = getFocusedRouteNameFromRoute(route);
    return (
        <>
            <StatusBar style="light" backgroundColor={theme.colors.secondary} />
            <Tab.Navigator
                initialRouteName={'Home'}
                tabBar={(props)=><TabBar {...props} />}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                    }}
                />
                <Tab.Screen
                    name="Services"
                    component={Services}
                    options={{
                        tabBarLabel: 'Services',
                    }}
                />
                <Tab.Screen
                    name="Book"
                    component={BookScreen}
                    options={{
                        tabBarLabel: 'Book',
                    }}
                />
                 <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                    }}
                />
            </Tab.Navigator>
        </>
    );
};
