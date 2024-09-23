import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../assets/colors/colors';
import Headers from '../../components/Headers';
import MainStyling from '../../assets/styles/MainStyling';
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';

const Coach = () => {
  const dropDownClientRef = useRef();
  const [selectedClient, setSelectedClient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coach, setCoach] = useState([
    {
      title: 'Coach 1',
    },
    {
      title: 'Coach 2',
    },
  ]);
  const [client, setClient] = useState([
    {
      subtitle: 'Client 1',
    },
    {
      subtitle: 'Client 2',
    },
    {
      subtitle: 'Client 3',
    },
    {
      subtitle: 'Client 4',
    },
  ]);

  const DropdownClient = () => {
    return (
      <View style={styles.dropDownContainer}>
        <RBSheet
          ref={dropDownClientRef}
          closeOnDragDown={true}
          height={400}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            draggableIcon: {
              backgroundColor: colors.primary,
              width: wp('13%'),
            },
            container: [styles.sheetContainer, MainStyling.screenPadding],
          }}>
          <TouchableOpacity
            style={[styles.bar]}
            onPress={() => {
              dropDownClientRef.current.close();
            }}></TouchableOpacity>
          <View style={MainStyling.divider}></View>

          <SafeAreaView style={{flex: 1}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              vertical={true}
              data={client}
              keyExtractor={item => item.id}
              renderItem={clientCard}
            />
          </SafeAreaView>
        </RBSheet>
      </View>
    );
  };

  const coachCard = ({item}) => {
    return (
      <View style={[{marginVertical: wp('1%')}]}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              padding: wp('2%'),
              backgroundColor: colors.white,
              justifyContent: 'space-between',
              borderRadius: 13,
            },
          ]}>
          <Text style={[MainStyling.buttonText, {marginLeft: wp('2%')}]}>
            {item?.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dropDownClientRef.current.open();
            }}
            style={[styles.circle]}>
            <Ionicons name="add" size={wp('6%')} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={[MainStyling.dividerTwo]}></View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={selectedClient}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: colors.off_white,
                  padding: wp('2%'),
                  paddingHorizontal: wp('3%'),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.light_grey,
                  marginHorizontal: wp('1%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: wp('1%'),
                },
              ]}>
              <Text
                style={[
                  MainStyling.buttonText,
                  {
                    marginLeft: wp('2%'),
                    color: colors.black,
                    flex: 1,
                  },
                ]}>
                {item}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={[styles.circleSetting]}>
                <Feather name="settings" size={wp('5%')} color={colors.gray} />
              </TouchableOpacity>
            </View>
          )}
        />
        {/* </View> */}
      </View>
    );
  };

  const clientCard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderColor: colors.light_grey,
          borderWidth: 1,
          marginVertical: wp('0.5%'),
        }}
        onPress={() => {
          setSelectedClient(pre => [...pre, item?.subtitle]);
          dropDownClientRef.current.close();
          console.log(selectedClient);
        }}>
        <View
          style={[
            {flexDirection: 'row', alignItems: 'center', padding: wp('2.5%')},
          ]}>
          <Text
            style={[MainStyling.buttonText, {marginLeft: wp('2%'), flex: 1}]}>
            {item?.subtitle}
          </Text>
          <View
            style={{
              backgroundColor: colors.light_grey,
              padding: wp('3%'),
              // paddingHorizontal: wp('3%'),
              borderRadius: 200,
              alignItems: 'centre',
            }}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={wp('6%')}
              color={colors.primary}
              onPress={() => {}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[MainStyling.mainContainer, {}]}>
      <Headers iconLeft={false} title={'Hello, Jasmine'} />
      <View style={[MainStyling.dividerTwo]}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[MainStyling.screenPadding]}>
        <View style={[styles.box]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            vertical={true}
            data={coach}
            keyExtractor={item => item.id}
            renderItem={coachCard}
          />
          <View style={[MainStyling.divider]}></View>
        </View>
      </ScrollView>
      <CustomModal
        modalType={'input'}
        setShowModal={setShowModal}
        showModal={showModal}
        onCancelButtonPress={() => {
          setShowModal(false);
        }}
        onSubmitButtonPress={() => {
          setShowModal(false);
        }}
      />
      {DropdownClient()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 15,
    backgroundColor: colors.off_white,
    padding: wp('4.5%'),
    borderRadious: 15,
    borderWidth: 1.5,
    borderColor: colors.light_grey,
  },

  boxtwo: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 15,
    marginHorizontal: wp('0%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('5%'),
  },
  dropDownContainer: {
    borderRadius: 50,
  },
  bar: {
    backgroundColor: colors.light_grey,
    width: wp('25%'),
    height: wp('1.5%'),
    marginTop: wp('1%'),
    borderRadius: 5,
    alignSelf: 'center',
  },
  circle: {
    backgroundColor: colors.secondary,
    padding: wp('2%'),
    borderRadius: 200,
    alignItems: 'centre',
  },
  circleSetting: {
    backgroundColor: colors.light_grey,
    padding: wp('2%'),
    borderRadius: 200,
    alignItems: 'centre',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    padding: wp('8%'),
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: wp('3%'),
  },
  sheetContainer: {borderTopLeftRadius: 30, borderTopRightRadius: 30},
  modalContent: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Coach;
