import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, Linking, SafeAreaView, FlatList,Image, StatusBar, TouchableOpacity,} from 'react-native';
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import {imgHeader} from "../../commons/images";
import call from 'react-native-phone-call';

export default function Header() {

    const theme = useTheme();
    const styles = useStyles(theme);


    const phoneCall = () => {
        const args = {
            number: '9033805116',
            prompt: true,
        };
        call(args).catch(console.error);
      }


    return(
        <View style={styles.topPanel}>
        <View style={styles.topPanelContent}>
            <View style ={styles.mapArea}>
                <Icon name="navigate" color={theme.colors.black} size={theme.hp('4%')} />
            </View>

            <View style={styles.logoArea}>
                <Image source={imgHeader} style={styles.logoStyle}/>                  
            </View>
            
            <View style ={styles.phoneArea}>
              <TouchableOpacity style={styles.phoneNumberWrapper} onPress={phoneCall}>
                <Icon name="call" color={theme.colors.black} size={theme.hp('4%')} />
              </TouchableOpacity>
            </View>             
        </View>
    </View>  
    )
}

const useStyles = theme => StyleSheet.create({
    topPanel: {
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'hidden',
        width: '100%',
        height: theme.hp('13%'),
        paddingBottom: 1, 
        zIndex: 4,  
    },
    topPanelContent: { 
        overflow:'hidden', 
        padding: '20%',
    },
    mapArea: {
        position: 'absolute',
        left: theme.wp('8%'),
        top: theme.hp('1.7%'),
    },
    phoneArea: {
        position: 'absolute',
        right: theme.wp('8%'),
        top: theme.hp('1.7%'), 
    },
    logoStyle:{
      width: theme.wp('38%'),
      height: theme.wp('15%'),
      resizeMode: 'contain',
    },
    logoArea: {
        position: 'absolute',
        left: theme.wp('33%'),
        top: theme.hp('4.0%'), 
    },
})