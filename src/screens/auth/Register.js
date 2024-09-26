import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, StyleSheet, ScrollView, Modal, Pressable } from 'react-native'
import MainStyling from '../../assets/styles/MainStyling'
import colors from '../../assets/colors/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Headers from '../../components/Headers';
import Input from '../../components/Input';


const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style = {[MainStyling.mainContainer,{backgroundColor: colors.off_white}]}>
    <StatusBar barStyle="light-content"/>
    <LinearGradient
      colors={[colors.light_primary, colors.primary, colors.dark_primary]}
      style={[MainStyling.screenPadding,styles.linearGradient,]}>
        <Headers/>
        <View style={[MainStyling.divider]}/>

      

            <Text style={[MainStyling.titleHeading,styles.text]}>Create An Account</Text>
            <Text style={[MainStyling.miniText,styles.text]}>Register with your correct information</Text>

        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false} style={[MainStyling.screenPadding,{flex:0.5, }]}>
          
        <Input
            value={name}
            placeholder="Username"   
            iconPosition={'left'}   
            iconName={'user'}       
            onChangeText={value => setName(value)}
            onIconPress={() => console.log('OK')}
          />
           <Input
            value={email}
            placeholder="Email Address"            
            iconPosition={'left'}   
            iconName={'mail'}   
            onChangeText={value => setEmail(value)}
            onIconPress={() => console.log('OK')}
          />
           <Input
            value={number}
            placeholder="Phone Number"  
            iconPosition={'left'}   
            iconName={'phone'}            
            onChangeText={value => setNumber(value)}
            onIconPress={() => console.log('OK')}
          />
          <Input
            value={password}
            secureTextEntry={secureTextEntry}
            placeholder="Enter Password"          
            iconName={secureTextEntry == true ? 'eye-off' : 'eye'}
            onChangeText={value => setPassword(value)}
            onIconPress={() => setSecureTextEntry(!secureTextEntry)}
          />
             <Input
            value={confirmPassword}
            secureTextEntry={secureTextEntry}
            placeholder="Confirm Password"          
            iconName={secureTextEntry == true ? 'eye-off' : 'eye'}
            onChangeText={value => setConfirmPassword(value)}
            onIconPress={() => setSecureTextEntry(!secureTextEntry)}
          />
           </ScrollView>
         
          <View style={[MainStyling.divider]}/>
          <View style={[MainStyling.screenPadding,{flex:0.3}]}>
           <Button
          label="Sign Up"
          iconName="send"
          onPress={() => {
            setModalVisible(true)
          }}
        />
          <View style={[MainStyling.dividerTwo]}/>
          <View style={[MainStyling.alignmentCenter,{flexDirection:'row', }]}>
            <Text style={[MainStyling.label,{color: colors.black}]}>Already have an account? </Text>
            <Text style={[MainStyling.label,{color: colors.primary}]}>Sign Up here</Text>

          </View>
          </View>
  
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={[MainStyling.alignmentCenter,{flex:1}]}>
          <View style={styles.modalView}>
            <Text style={[MainStyling.buttonText,{textAlign:'center', color: colors.black}]}>Your Account Has Been Created Successfully</Text>
            <View style={[MainStyling.divider]}/>
            <Pressable
              style={[styles.button,]}
              onPress={() => {
                navigation.navigate('Login')
              }}>
              <Text style={[MainStyling.buttonText,styles.textStyle]}>Log In</Text>
              
            </Pressable>
              </View>
        </View>
      </Modal>
       

    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  linearGradient: {
     flex:0.5,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },
  text: {
    color: colors.white,
    textAlign:'center',
  }, 
  modalView: {
    width: wp('90%'),
    height: wp('80%'),
    margin: 20,
    backgroundColor: colors.off_white,
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
   width: wp('70%'),
   backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
 
  textStyle: {
    color: 'white',   
    textAlign: 'center',
  },
 
})

export default Register