import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const TabViews = ({index}) => {
  const navigation = useNavigation();
  const [tab, setTab] = useState([
    {
      id:1,
    },
    {
      id:2,
    },
    {
      id:3,
    },
    {
      id:4,
    },
    {
      id:5,
    },
    {
      id:6,
    },
    {
      id:7,
    },
    {
      id:8,
    },
    {
      id:9,
    },
  ]);
   
  const tabCard = ({item}) => {
    return(
     <View  style={[{borderWidth:2,
      height:wp("1%"),
      borderColor:
      index===item?.id?
      colors.primary
      :
      
      colors.gray,marginVertical:wp("1"),marginHorizontal:wp("1"),width:wp("7.5%"),borderRadius:300}]}/>
    )
  }

  return (
    <View>
    <FlatList
           horizontal={true}
            data={tab}
            style={{alignSelf:"center",marginVertical:wp("3")}}
            keyExtractor={item => item.id}
            renderItem={tabCard}
          />

    </View>
  
  );
};

const Styles = StyleSheet.create({
  view: {
    //paddingHorizontal: wp('5%'),
    //paddingVertical: wp('0.1%'),
    // height:('65%'),
    width:('15%'),    
    backgroundColor: colors.primary,
   
  },
});

export default TabViews;
