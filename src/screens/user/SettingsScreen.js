import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../../components/shared/Header';
import {userLogout} from '../../store/actions';
import {useDispatch} from 'react-redux';
import {Button} from '../../components';



export const SettingsScreen = ({navigation}) => {

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(userLogout()).then(()=>{
        navigation.reset({index:0, routes:[{name:'Home'}]});
    });
};

  return (
    <View style={styles.root}>
      <Header/>
      <ScrollView>
          <View style={{paddingHorizontal: 30, backgroundColor:'white'}}>
              <Button title="Sign Out" onPress={signOut} />
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
      flex: 1,
      width:'100%',
      zIndex: 0,
      position:'relative',
      backgroundColor:'white',
  },
});