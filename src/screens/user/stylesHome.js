import {StyleSheet} from "react-native";

export const useStyles = theme =>
    StyleSheet.create({
        root: {
            flex: 1,
          width:'100%',
          zIndex: 0,
          position:'relative',
          backgroundColor:'white',
      },
      statusBar:{
          position:'absolute',
          top: 0,
          width:'100%',
          backgroundColor:theme.colors.main,
      },
      container:{
          width:'100%',
          zIndex: 0,
          position:'relative',
          padding: 5,
      },
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
          padding: '10%',
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
      homeCatItem: {
          position:'relative',
          width: theme.wp('90%'),
          height: theme.hp('40%'),
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: 'white',
          marginVertical: 2.5,
          overflow:'hidden',
          zIndex: 1,
          marginHorizontal: theme.wp('2%'),
          marginTop: theme.wp('1.5%'),
          marginBottom: theme.wp('3.5%'),
      },
      homeCatImage: {
          width: theme.wp('90%'),
          height: theme.hp('40%'),
      },
      aboutDetailItem: {
        position:'relative',
        width: theme.wp('30%'),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        marginVertical: 2.5,
        overflow:'hidden',
        zIndex: 1,
        marginHorizontal: theme.wp('2%'),
        marginTop: theme.wp('1.5%'),
        marginBottom: theme.wp('3.5%'),
    },
    aboutDetailImage: {
        width: theme.wp('30%'),
        height: theme.hp('30%'),
    },
      
      aboutTextItem: {
      
      },
      aboutTextArea:{
          width: theme.wp('100%'),
          padding: theme.wp('2%'),
      },
      aboutTextTitle:{
          marginLeft: theme.wp('3%'),
          fontSize: 15,
          fontWeight: 'bold',
      },
      homeCatRemove:{
          position:'absolute',
          top: 0,
          right: 0,
          width: 30,
          height: 30,
          zIndex: 5,
          justifyContent: 'center',
          alignItems: 'center',
      },
      homeCatTitle:{
          backgroundColor:'white',
          textAlign:'center',
          position:'absolute',
          fontWeight: 'bold',
          bottom: 0,
          padding: 5,
          width:'100%'
      },
      
      homeCatAddItem:{
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
      sectionTitle: { 
          marginTop: theme.hp('2%'),
          height: theme.hp('5%'),
          alignItems: 'center',
          zIndex: 2,
      },
      sectionText: {
          fontSize: theme.hp('2.5%'),
          fontWeight: 'bold',
      },
      aboutTextPara:{
        
      },
      paragraphArea: {
          width: theme.wp('100%'),
          padding: 15,
          alignItems:'center',
      },
      paragraphText: {
          fontSize: 15,
      },
      newArrivalImage:{
          width: 200,
          height: 200,
      },
    })