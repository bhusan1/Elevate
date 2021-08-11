import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export const Brazilian = () => {

  return (
    <ScrollView>
    <View style={styles.root}>
        <View style={styles.headArea}>
          <Text style={styles.headText}>Hello World</Text>
          <Text style={styles.contText}>Yes</Text>
          <Text style={styles.contText}>No</Text>
          <Image 
            style={styles.image} 
            source ={{uri:'https://elevatehairsalon.com/wp-content/uploads/2016/12/before-after-brunette.jpg'}}
          />
        </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    marginTop: 15
  },
  headArea: {
    flex: 1, 
    justifyContent: 'center', 
    marginTop: 19
  },
  headText: {
    fontSize: 22, 
    color: 'red', 
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
  }
});