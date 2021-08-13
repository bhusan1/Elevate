import React, { useEffect,useCallback, useState } from 'react';
import { FlatList, ScrollView, Text, View, Image, StyleSheet, Linking, SafeAreaView, TouchableOpacity} from 'react-native';
import { useTheme } from "react-native-paper";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { imgHeader } from "../../commons/images";
import { Button } from '../../components';
import Header from '../../components/shared/Header';
import call from 'react-native-phone-call';


const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
const latLng = `${29.73370},${-95.84731}`;
const label = 'Elevate Hair Salon';

const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`,
});

const OpenMaps = () =>{
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}, [url]);
return <Button style={{padding: 2, marginBottom: 0,}} titleStyle={{fontFamily:'OpenSans'}} title={'Open Maps'} onPress={handlePress} />;
};




export const BookScreen = (navigation) => {


  const theme = useTheme();
  const styles = useStyles(theme);

  const phoneCall = () => {
    const args = {
        number: '9033805116',
        prompt: true,
    };
    call(args).catch(console.error);
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.root}>
          
          <Header/>

    <ScrollView>
    <View style={styles.root}>
        <View style={styles.headArea}>
          <Text style={styles.headText}>Book an apppointment</Text>
          <Button title={'Book Your Appointment'} 
          style={styles.bookButton} 
          icon={<Icon name="calendar" color={'white'} size={theme.hp('5%')}/>}
            onPress={()=>{Linking.openURL('https://reports.appheaven.us/online/go2.php?merchantid=58C7KX5BKKSA1')}}
          />
        </View>
        <View style={styles.headArea}>
          <Text style={styles.headText}>Call Us</Text>
          <Button title={'832-437-5994'} 
          style={styles.callButton} 
          icon={<Icon name="call" color={'white'} size={theme.hp('5%')}/>}
            onPress={phoneCall}
          />
        </View>
        <View style={styles.headArea}>
          <Text style={styles.headText}>Address</Text>
          <Text style={styles.headText}>4020 FM 1463, Katy, TX 77494</Text>
          {/* <Button title={'Open Map'} style={styles.callButton} icon={<Icon name="navigate" color={'white'} size={theme.hp('5%')}/>}
            onPress={()=>{openMapLink}}
          /> */}
          <OpenMaps url={url}/>
        </View>
    </View>

    </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const useStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    width:'100%',
    zIndex: 0,
    position:'relative',
    backgroundColor:'white',
},
  headArea: {
    flex: 1, 
    justifyContent: 'center', 
    marginTop: 19
  },
  headText: {
    fontSize: 22, 
    color: theme.colors.black, 
    textAlign: 'center', 
    paddingBottom: 10
  },
  contText: {
    fontSize: 12, 
    color: 'black', 
    textAlign: 'center'
  },
  image : {
    flex: 1,
    height:300,
    width: '100%',
    resizeMode: 'cover'
  },
  bookButton: {
    color: theme.colors.black
  },
  callButton: {
    color: theme.colors.black,
  },

  topPanel: {
    position: 'relative',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 5, 
    zIndex: 4,  
},
topPanelContent: { 
    borderColor: theme.colors.main,
    borderBottomWidth: 10,
    borderBottomRightRadius: theme.wp('5%'),
    borderBottomLeftRadius: theme.wp('5%'),
    overflow:'hidden', 
    padding: '8%',
},
topTextArea: {
    position: 'absolute',
    left: theme.wp('40%'),
    top: theme.hp('2.7%'),
},
topText: {
    fontSize: theme.hp('3%'),
    fontWeight:'bold',
    color: 'black',
},
phoneArea: {
    position: 'absolute',
    right: theme.wp('8%'),
    top: theme.hp('1.7%'), 
},
mapArea: {
    position: 'absolute',
    left: theme.wp('8%'),
    top: theme.hp('1.0%'),
},
logoStyle:{
  width: theme.wp('12%'),
  height: theme.wp('12%'),
  resizeMode: 'contain',
},
});