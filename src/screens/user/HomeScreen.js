import React, {useState, useCallback, useEffect,} from 'react';
import {View, ScrollView, Text, StyleSheet, Alert, Linking, SafeAreaView, FlatList,Image, StatusBar, TouchableOpacity,} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Constants from 'expo-constants';
import {useSelector} from 'react-redux';
import * as Notifications from 'expo-notifications';
import {useFirebase, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {Button, Input, Paper, Overlay} from "../../components";
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from "react-native-paper";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import {validate} from "../../commons/helper";
import ImageView from "react-native-image-view";
import { v4 as uuid } from 'uuid';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from '../../components/shared/Header';
import {useStyles} from "./stylesHome";


export const HomeScreen = () => {

  useFirestoreConnect([
    {collection:'homeCategories', storeAs: 'homeCategories'},
    {collection:'aboutDetails', storeAs: 'aboutDetails'},
    {collection:'aboutTexts', storeAs: 'aboutTexts'},
    ]);

    const insets = useSafeAreaInsets();    

    const theme = useTheme();
    const styles = useStyles(theme);
    const firebase = useFirebase();
    const firestore = useFirestore();

    const authUser = useSelector(state=>state.firebase.profile);
    const homeCategories = useSelector(state=>state.firestore.ordered.homeCategories || []);
    const aboutDetails = useSelector(state=>state.firestore.ordered.aboutDetails || []);
    const aboutTexts = useSelector(state=>state.firestore.ordered.aboutTexts || []);
    
    const [visibleH, setVisibleH] = useState(false);
    const [visibleA, setVisibleA] = useState(false);
    const [visibleT, setVisibleT] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [homeCategory, setHomeCategory] = useState({title:'', image:''});
    const [aboutDetail, setAboutDetail] = useState({title:'', image:''});
    const [aboutText, setAboutText] = useState({description:''});
    const [images, setImages] = useState([]);
    const [fullImage, setFullImage] = useState(false);


    const removeHomeCategory = (item) => {
      Alert.alert(
        'Confirm',
        'Do you really want to remove it?',
        [
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text: 'Delete',
                onPress:()=>{
                    console.log(item)
                    firestore.collection('homeCategories')
                        .doc(item.id).delete().then(res=>{
                        console.log(res);
                    })
                }
            }
        ]
      );
  }

  const removeAboutDetail = (item) => {
    Alert.alert(
      'Confirm',
      'Do you really want to remove it?',
      [
          {
              text:'Cancel',
              style:'cancel'
          },
          {
              text: 'Delete',
              onPress:()=>{
                  console.log(item)
                  firestore.collection('aboutDetails')
                      .doc(item.id).delete().then(res=>{
                      console.log(res);
                  })
              }
          }
      ]
    );
} 

    const removeAboutText = (item) => {
      Alert.alert(
        'Confirm',
        'Do you really want to remove it?',
        [
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text: 'Delete',
                onPress:()=>{
                    console.log(item)
                    firestore.collection('aboutTexts')
                        .doc(item.id).delete().then(res=>{
                        console.log(res);
                    })
                }
            }
        ]
      );
    }

    const renderHomeCat = ({item}) => {

      if(item === 'add'){
          return (
              <TouchableOpacity style={styles.homeCatAddItem} onPress={()=>{setVisibleH(true)}}>
                  <Feather name={'plus'} size={theme.wp('12%')}/>
              </TouchableOpacity>
          )
      }else {
          return (
              <TouchableOpacity style={styles.homeCatItem}>
                  {
                      authUser.role === 'admin' &&
                      <TouchableOpacity style={styles.homeCatRemove} onPress={()=>{removeHomeCategory(item)}}>
                          <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                      </TouchableOpacity>
                  }
                  <Image source={{uri: item.image}} style={styles.homeCatImage}/>
                 {/*  <Text style={styles.homeCatTitle}>{item.title}</Text> */}
              </TouchableOpacity>
          )
      }
    }

    const renderAboutDetail = ({item}) => {

      if(item === 'add'){
          return (
              <TouchableOpacity style={styles.homeCatAddItem} onPress={()=>{setVisibleA(true)}}>
                  <Feather name={'plus'} size={theme.wp('12%')}/>
              </TouchableOpacity>
          )
      }else {
          return (
              <TouchableOpacity style={styles.aboutDetailItem}>
                  {
                      authUser.role === 'admin' &&
                      <TouchableOpacity style={styles.homeCatRemove} onPress={()=>{removeAboutDetail(item)}}>
                          <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                      </TouchableOpacity>
                  }
                  <Image source={{uri: item.image}} style={styles.aboutDetailImage}/>
                  <Text style={styles.homeCatTitle}>{item.title}</Text>
              </TouchableOpacity>
          )
      }
    }

    const renderAboutText = ({item}) => {

      if(item === 'add'){
          return (
              <TouchableOpacity style={styles.homeCatAddItem} onPress={()=>{setVisibleT(true)}}>
                  <Feather name={'plus'} size={theme.wp('12%')}/>
              </TouchableOpacity>
          )
      }else {
          return (
              <View style={styles.aboutTextItem}>
                  {
                      authUser.role === 'admin' &&
                      <TouchableOpacity style={styles.homeCatRemove} onPress={()=>{removeAboutText(item)}}>
                          <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                      </TouchableOpacity>
                  }
                  <View style={styles.aboutTextArea}>
                  <Text style={styles.aboutTextPara}>{item.description}</Text>
                  </View>
              </View>
          )
      }
    }

    const submitHomeCat = () => {
      if(validate(homeCategory, {title:'required', image:'required'})){
          firestore.collection('homeCategories')
              .add(homeCategory).then(res=>{
                  setHomeCategory({title:'', image: ''});
                  setVisibleH(false);
          })
      }
    }

    const submitAboutDetail = () => {
      if(validate(aboutDetail, {title:'required', image:'required'})){
          firestore.collection('aboutDetails')
              .add(aboutDetail).then(res=>{
                  setAboutDetail({id:'', title:'', image: ''});
                  setVisibleA(false);
          })
      }
    }

    const submitAboutText = () => {
      if(validate(aboutText, {description:'required'})){
          firestore.collection('aboutTexts')
              .add(aboutText).then(res=>{
                  setAboutText({description: ''});
                  setVisibleT(false);
          })
      }
    }

    const handleClose = () => {
      setFullImage(false);
    }

    const openImageHomeCat = async () => {
      ImagePicker.launchImageLibraryAsync().then(async (res)=>{
          if(!res.cancelled){
              const {uri} = res;
              const response = await fetch(uri);
              const blob = await response.blob();
              const fileName = uuid() + '.' + uri.split('.').pop();
              setLoading(true);
              firebase.storage().ref(`/homeCategories/${fileName}`)
                  .put(blob).on(
                  "state_changed",
                  (snapshot )=> {
                      const progress = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes * 100);
                      setProgress(progress);
                  },
                  (error) => {
                      console.log(error);
                  },
                  ()=>{
                      firebase.storage()
                          .ref("homeCategories/")
                          .child(fileName)
                          .getDownloadURL()
                          .then((url) => {
                              console.log(url)
                              setHomeCategory({...homeCategory, image: url})
                              setLoading(false);
                          })
                  }
              )
          }
      });

    };

    const openImageAboutDetail = async () => {
      ImagePicker.launchImageLibraryAsync().then(async (res)=>{
          if(!res.cancelled){
              const {uri} = res;
              const response = await fetch(uri);
              const blob = await response.blob();
              const fileName = uuid() + '.' + uri.split('.').pop();
              setLoading(true);
              firebase.storage().ref(`/aboutDetails/${fileName}`)
                  .put(blob).on(
                  "state_changed",
                  (snapshot )=> {
                      const progress = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes * 100);
                      setProgress(progress);
                  },
                  (error) => {
                      console.log(error);
                  },
                  ()=>{
                      firebase.storage()
                          .ref("aboutDetails/")
                          .child(fileName)
                          .getDownloadURL()
                          .then((url) => {
                              console.log(url)
                              setAboutDetail({...aboutDetail, image: url})
                              setLoading(false);
                          })
                  }
              )
          }
      });

    };  

    useEffect(() => {
      registerForPushNotificationsAsync().then(async (token) => {
          if(token && authUser.uid){
              const tokenRef = firestore.collection('tokens').doc(token);
              if (authUser.muteNotifications){
                  await tokenRef.delete();
              }else {
                  await tokenRef.set({ user: authUser.uid, token: token})
              }
          }
      });
    }, [authUser]);


  return (
    <SafeAreaView style={{flex:1}}>
    
        <View style={styles.root}>

            {/*  Home categories Overlay */}

            <Overlay isVisible={visibleH} onBackdropPress={()=>{setVisibleH(false)}}>
            <Spinner visible={loading} textContent={`Uploading (${progress}%)`} textStyle={{color: 'white'}} />
            <View style={{width: theme.wp('70%')}}>
                <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleH(false)}}>
                    <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                </TouchableOpacity>
                <Text>Title</Text>
                <Input value={homeCategory.title} style={styles.inputStyle} placeholder={'Title'} onChangeText={(name, value)=>{setHomeCategory({...homeCategory, title: value})}} />
                <View style={{flexDirection:'row', marginVertical: 10,}}>
                    <Text>Image</Text>
                    <TouchableOpacity
                        style={{width: 20, height: 20, ...theme.styles.center, backgroundColor: theme.colors.success, marginLeft: 5, borderRadius: 10,}}
                        onPress={openImageHomeCat}
                    >
                        <Feather name={'plus'} size={16} color={'white'}/>
                    </TouchableOpacity>
                </View>
                <Button title={'Submit'} onPress={submitHomeCat}/>
            </View>
        </Overlay>

            {/*  About Details Overlay */}

            <Overlay isVisible={visibleA} onBackdropPress={()=>{setVisibleA(false)}}>
                <Spinner visible={loading} textContent={`Uploading (${progress}%)`} textStyle={{color: 'white'}} />
                <View style={{width: theme.wp('70%')}}>
                    <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleA(false)}}>
                        <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                    </TouchableOpacity>
                    <Text>Title</Text>
                    <Input value={aboutDetail.title} style={styles.inputStyle} placeholder={'Title'} onChangeText={(name, value)=>{setAboutDetail({...aboutDetail, title: value})}} />
                    <View style={{flexDirection:'row', marginVertical: 10,}}>
                        <Text>Image</Text>
                        <TouchableOpacity
                            style={{width: 20, height: 20, ...theme.styles.center, backgroundColor: theme.colors.success, marginLeft: 5, borderRadius: 10,}}
                            onPress={openImageAboutDetail}
                        >
                            <Feather name={'plus'} size={16} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                    <Button title={'Submit'} onPress={submitAboutDetail}/>
                </View>
            </Overlay>

            {/*  About Text Overlay */}

            <Overlay isVisible={visibleT} onBackdropPress={()=>{setVisibleT(false)}}>
                <View style={{width: theme.wp('70%')}}>
                    <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleT(false)}}>
                        <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                    </TouchableOpacity>
                    <Text>Description</Text>
                    <Input value={aboutText.description} style={styles.inputStyle} placeholder={'Description'} onChangeText={(name, value)=>{setAboutText({...aboutText, description: value})}} />
                    <Button title={'Submit'} onPress={submitAboutText}/>
                </View>
            </Overlay>  
            
                <Header/>

            <ScrollView>
               
                <View style={styles.container}>
                    
                    {/* home categories flatlist */}


                    <FlatList
                        horizontal
                        style={{width: '100%'}}
                        data={authUser.role === 'admin'?[...homeCategories,'add']: homeCategories}
                        renderItem={renderHomeCat}
                        showsVerticalScrollIndicator ={false}
                        keyExtractor={item => JSON.stringify(item)}
                    />

                    {/* About Images Flatlist */}

                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionText}> Services </Text>
                    </View>

                    <FlatList
                        horizontal
                        style={{width: '100%'}}
                        data={authUser.role === 'admin'?[...aboutDetails,'add']: aboutDetails}
                        renderItem={renderAboutDetail}
                        showsVerticalScrollIndicator ={false}
                        keyExtractor={item => JSON.stringify(item)}
                    />

                        {/* About texts Flatlist */}

                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionText}> About Elevate</Text>
                    </View>

                    <FlatList
                        style={{width:'100%'}}
                        data = {authUser.role === 'admin'?[...aboutTexts,'add']: aboutTexts}
                        renderItem={renderAboutText}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item=> JSON.stringify(item)}
                    />

                    <ImageView
                        images={images}
                        imageIndex={0}
                        isVisible={fullImage}
                        onClose={handleClose}
                        animationType={'none'}
                        />
                
                </View>

            </ScrollView>        
        </View>
    </SafeAreaView>
  );
};


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
      }
      if (finalStatus !== 'granted') {
          Alert.alert(
              'Warning',
              'Please enable the permission to get push notification',
              [
                  {
                      style:'cancel',
                      text:'Cancel'
                  },
                  {
                      text:'Settings',
                      onPress:()=>{
                          Linking.openSettings();
                      }
                  }
              ]
          )
          return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
      console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
      });
  }

  return token;
}
