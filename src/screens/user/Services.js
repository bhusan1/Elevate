import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View, Alert, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import {useSelector} from 'react-redux';
import Header from '../../components/shared/Header';
import theme from '../../theme';
import {useTheme} from "react-native-paper";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import {validate} from "../../commons/helper";
import {Button, Input, Paper, Overlay} from "../../components";


export const Services = () => {

  useFirestoreConnect([
    {collection: 'womenServices', storeAs:'womenServices'},
    {collection: 'menServices', storeAs:'menServices'},
    {collection: 'colorServices', storeAs:'colorServices'},
  ])

  const insets = useSafeAreaInsets();

  const theme = useTheme();
  const styles = useStyles(theme);
  const firebase = useFirebase();
  const firestore = useFirestore();

  const authUser = useSelector(state=>state.firebase.profile);
  const womenServices = useSelector(state=>state.firestore.ordered.womenServices || []);
  const menServices = useSelector(state=>state.firestore.ordered.menServices || []);
  const colorServices = useSelector(state=>state.firestore.ordered.colorServices || []);

  const [visibleW, setVisibleW] = useState(false);
  const [visibleM, setVisibleM] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [womenService, setWomenService] = useState({title:'', price:''});
  const [menService, setMenService] = useState({title:'', price:''});
  const [colorService, setColorService] = useState({title:'', price:''});


const removeWomenService = (item) => {
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
                firestore.collection('womenServices')
                    .doc(item.id).delete().then(res=>{
                    console.log(res);
                })
            }
        }
    ]
  );
}
const removeMenService = (item) => {
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
                firestore.collection('menServices')
                    .doc(item.id).delete().then(res=>{
                    console.log(res);
                })
            }
        }
    ]
  );
}
const removeColorService = (item) => {
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
                firestore.collection('colorServices')
                    .doc(item.id).delete().then(res=>{
                    console.log(res);
                })
            }
        }
    ]
  );
}

const renderWomenService = ({item}) => {

  if(item === 'add'){
      return (
          <TouchableOpacity style={styles.ServiceAddItem} onPress={()=>{setVisibleW(true)}}>
              <Feather name={'plus'} size={theme.wp('12%')}/>
          </TouchableOpacity>
      )
  }else {
      return (
          <TouchableOpacity style={styles.ServiceItem}>
              {
                  authUser.role === 'admin' &&
                  <TouchableOpacity style={styles.ServiceRemove} onPress={()=>{removeWomenService(item)}}>
                      <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                  </TouchableOpacity>
              }
              <View style={styles.lists}>
                <View style={styles.listsTitleArea}>
                  <Text style={styles.listsTitle}>{item.title}</Text>
                </View>
                <View style={styles.listsPriceArea}>
                  <Text style={styles.priceTitle}>{item.price}</Text>
                </View>
              </View>
          </TouchableOpacity>
      )
  }
}

const renderMenService = ({item}) => {

  if(item === 'add'){
      return (
          <TouchableOpacity style={styles.ServiceAddItem} onPress={()=>{setVisibleM(true)}}>
              <Feather name={'plus'} size={theme.wp('12%')}/>
          </TouchableOpacity>
      )
  }else {
      return (
          <TouchableOpacity style={styles.ServiceItem}>
              {
                  authUser.role === 'admin' &&
                  <TouchableOpacity style={styles.ServiceRemove} onPress={()=>{removeMenService(item)}}>
                      <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                  </TouchableOpacity>
              }
              <View style={styles.lists}>
                <View style={styles.listsTitleArea}>
                  <Text style={styles.listsTitle}>{item.title}</Text>
                </View>
                <View style={styles.listsPriceArea}>
                  <Text style={styles.priceTitle}>{item.price}</Text>
                </View>
              </View>
          </TouchableOpacity>
      )
  }
}

const renderColorService = ({item}) => {

  if(item === 'add'){
      return (
          <TouchableOpacity style={styles.ServiceAddItem} onPress={()=>{setVisibleC(true)}}>
              <Feather name={'plus'} size={theme.wp('12%')}/>
          </TouchableOpacity>
      )
  }else {
      return (
          <TouchableOpacity style={styles.ServiceItem}>
              {
                  authUser.role === 'admin' &&
                  <TouchableOpacity style={styles.ServiceRemove} onPress={()=>{removeColorService(item)}}>
                      <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
                  </TouchableOpacity>
              }
              <View style={styles.lists}>
                <View style={styles.listsTitleArea}>
                  <Text style={styles.listsTitle}>{item.title}</Text>
                </View>
                <View style={styles.listsPriceArea}>
                  <Text style={styles.priceTitle}>{item.price}</Text>
                </View>
              </View>
          </TouchableOpacity>
      )
  }
}

const submitWomenService = () => {
  if(validate(womenService, {title:'required', price:'required'})){
      firestore.collection('womenServices')
          .add(womenService).then(res=>{
              setWomenService({title:'', price: ''});
              setVisibleW(false);
      })
  }
}

const submitMenService = () => {
  if(validate(menService, {title:'required', price:'required'})){
      firestore.collection('menServices')
          .add(menService).then(res=>{
              setMenService({title:'', price: ''});
              setVisibleM(false);
      })
  }
}

const submitColorService = () => {
  if(validate(colorService, {title:'required', price:'required'})){
      firestore.collection('colorServices')
          .add(colorService).then(res=>{
              setColorService({title:'', price: ''});
              setVisibleC(false);
      })
  }
}


  return (
    
    <SafeAreaView style={{flex:1}}>
      <View style={styles.root}>

        {/*Women service*/}

        <Overlay isVisible={visibleW} onBackdropPress={()=>{setVisibleW(false)}}>
          <View style={{width: theme.wp('70%')}}>
              <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleW(false)}}>
                  <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
              </TouchableOpacity>
              <Text>Title</Text>
              <Input value={womenService.title} style={styles.inputStyle} placeholder={'Title'} onChangeText={(name, value)=>{setWomenService({...womenService, title: value})}} />
              <Text>Price</Text>
              <Input value={womenService.price} style={styles.inputStyle} placeholder={'Price'} onChangeText={(name, value)=>{setWomenService({...womenService, price: value})}} />
              <Button title={'Submit'} onPress={submitWomenService}/>
          </View>
        </Overlay>

        {/*Men service*/}

        <Overlay isVisible={visibleM} onBackdropPress={()=>{setVisibleM(false)}}>
          <View style={{width: theme.wp('70%')}}>
              <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleM(false)}}>
                  <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
              </TouchableOpacity>
              <Text>Title</Text>
              <Input value={menService.title} style={styles.inputStyle} placeholder={'Title'} onChangeText={(name, value)=>{setMenService({...menService, title: value})}} />
              <Text>Price</Text>
              <Input value={menService.price} style={styles.inputStyle} placeholder={'Price'} onChangeText={(name, value)=>{setMenService({...menService, price: value})}} />
              <Button title={'Submit'} onPress={submitMenService}/>
          </View>
        </Overlay>

        {/*Color service*/}

        <Overlay isVisible={visibleC} onBackdropPress={()=>{setVisibleC(false)}}>
          <View style={{width: theme.wp('70%')}}>
              <TouchableOpacity style={[styles.homeCatRemove,{top: -8, right: -8}]} onPress={()=>{setVisibleC(false)}}>
                  <SimpleLineIcons name={'close'} size={16} color={theme.colors.danger}/>
              </TouchableOpacity>
              <Text>Title</Text>
              <Input value={colorService.title} style={styles.inputStyle} placeholder={'Title'} onChangeText={(name, value)=>{setColorService({...colorService, title: value})}} />
              <Text>Price</Text>
              <Input value={colorService.price} style={styles.inputStyle} placeholder={'Price'} onChangeText={(name, value)=>{setColorService({...colorService, price: value})}} />
              <Button title={'Submit'} onPress={submitColorService}/>
          </View>
        </Overlay>

        <Header/>

        <ScrollView>

        <View style={styles.container}>

          <View style={styles.listHeadArea}>
            <Text style={styles.listHeadText}>Women Services</Text>
          </View>
          <FlatList
            style={{width:'100%'}}
            data = {authUser.role === 'admin'?[...womenServices,'add']: womenServices}
            renderItem={renderWomenService}
            showsVerticalScrollIndicator={false}
            keyExtractor={item=> JSON.stringify(item)}
          />

          <View style={styles.listHeadArea}>
            <Text style={styles.listHeadText}>Men Services</Text>
          </View>
          <FlatList
            style={{width:'100%'}}
            data = {authUser.role === 'admin'?[...menServices,'add']: menServices}
            renderItem={renderMenService}
            showsVerticalScrollIndicator={false}
            keyExtractor={item=> JSON.stringify(item)}
          />

          <View style={styles.listHeadArea}>
            <Text style={styles.listHeadText}>Color</Text>
          </View>
          <FlatList
            style={{width:'100%'}}
            data = {authUser.role === 'admin'?[...colorServices,'add']: colorServices}
            renderItem={renderColorService}
            showsVerticalScrollIndicator={false}
            keyExtractor={item=> JSON.stringify(item)}
          />

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
  container: {
    flex: 1,
    width:'100%',
    zIndex: 0,
    position:'relative',
    padding: 5,
    backgroundColor:theme.colors.btnContinue,
  },
  headArea: {
    flex: 1, 
    justifyContent: 'center', 
    marginTop: 19,
  },
  headText: {
    fontSize: 22, 
    color: 'black', 
    textAlign: 'center', 
    paddingBottom: 10
  },
  contText: {
    fontSize: 12, 
    color: 'black', 
    textAlign: 'center',
    paddingBottom: 3,
  },
  image : {
    flex: 1,
    height:300,
    width: '100%',
    resizeMode: 'cover'
  },
  lists: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: theme.wp('3%'),
  },
  listHeadArea: {
    width: theme.wp('100%'),
    alignItems: 'center',
    padding: theme.wp('3%'),
  },
  listHeadText: {
    fontSize: theme.fontSizes.normal,
    fontWeight: 'bold',
  },
  listsTitleArea: {
    width: theme.wp('75%'),
    padding: theme.wp('1%'),
  },
  listsTitle:{
    marginLeft: theme.wp('3%'),
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  listsPriceArea: {
    width: theme.wp('25%'),
    paddingTop: theme.hp('2%'),
  },
  priceTitle: {
    marginLeft: theme.wp('3%'),
    fontSize: 15,
    fontWeight: 'bold',
  },
  ServiceAddItem: {
    position:'relative',
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 5,
    overflow:'hidden',
    ...theme.styles.shadow,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#afafaf',
    zIndex: 2,
  },
  ServiceItem:{
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: theme.wp('2%'),
    overflow:'hidden', 
    padding: '1%',
    marginTop: theme.hp('1%'),
  },
  ServiceRemove:{
    position:'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});