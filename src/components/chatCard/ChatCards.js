import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import FastImage from 'react-native-fast-image';
import {COMPANY_IMAGE} from '../../apis/apis';
import {useNavigation} from '@react-navigation/native';

const ChatCards = ({item, indexes, setIndexes}) => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState('');
  const [providedDate, setProvidedDate] = useState(new Date(item.job_date));

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const currentDate = new Date();
    const timeDifference = providedDate - currentDate;

    if (timeDifference <= 0) {
      setCurrentTime('Time has passed');
      return;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    setCurrentTime(`${hours} : ${minutes} : ${seconds} `);
  };

  if (indexes === true) {
    if (item?.scheduling_status === '3') {
      return (
        <View
          style={{
            backgroundColor: colors.light_red,
            marginVertical: wp('2%'),
            marginHorizontal: wp('2%'),
            paddingVertical: wp('4%'),
            borderRadius: 10,
            elevation: 8,
          }}>
          <View
            style={[
              styles.card,
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp('7%'),
              },
            ]}>
            <FastImage
              style={styles.image}
              source={{
                uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <Text style={[MainStyling.buttonText, styles.title]}>
                {item?.name}
              </Text>

              <Text style={[MainStyling.label, {color: colors.gray}]}>
                {item?.time}
              </Text>

              <Text
                style={[MainStyling.label, {color: colors.gray}, styles.cityT]}>
                {item?.address}{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp('3%'),
            }}>
            {/* <TouchableOpacity
                onPress={() => {
                  setIndex(false);
                  navigation.navigate('Billing', {
                    job: item,
                  });
                }}
                style={[
                  styles.buttonDC,
                  {
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 30,
                  },
                ]}>
                <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
                  Payment
                </Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                // setIndexes(false);

                navigation.navigate('DetailChatEstimaion', {
                  detailSchedule: item,
                });
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 30,
                },
              ]}>
              <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
                {' '}
                View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('ChatMessages', {jobDetail: item});
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                },
              ]}>
              <Text style={[MainStyling.buttonText, {color: colors.white}]}>
                {' '}
                Chat
              </Text>
            </TouchableOpacity>
          </View>
          {item?.scheduling_status != '4' ? (
            <TouchableOpacity
              onPress={() => {
                console.log(item);
                navigation.navigate('Billing', {
                  job: item,
                  billingTab: 'false',
                });
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                  marginHorizontal: wp('3%'),
                  marginTop: wp('3%'),
                },
              ]}>
              <Text style={[MainStyling.buttonText, {color: colors.white}]}>
                Payment
              </Text>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              right: wp('5%'),
              left: wp('5%'),
              top: 10,
            }}>
            <View
              onPress={() => {}}
              style={[
                {
                  backgroundColor: colors.primary,
                  borderRadius: 30,

                  paddingHorizontal: wp('3%'),
                  paddingVertical: wp('1%'),
                },
              ]}>
              <Text style={[MainStyling.label, {color: colors.white}]}>
                Job number: #{item?.vehicle_number}
              </Text>
            </View>
            {item?.scheduling_status === '3' ? (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.green,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Pending
                </Text>
              </View>
            ) : item?.scheduling_status === '4' ? (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Completed
                </Text>
              </View>
            ) : (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Ongoing
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }
  } else {
    if (item?.scheduling_status != '3' && item?.scheduling_status != '4') {
      return (
        <View
          style={{
            backgroundColor: colors.light_red,
            marginVertical: wp('2%'),
            paddingVertical: wp('4%'),
            borderRadius: 10,
            elevation: 8,
            marginHorizontal: wp('2%'),
          }}>
          <View
            style={[
              styles.card,
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp('7%'),
              },
            ]}>
            <FastImage
              style={styles.image}
              source={{
                uri: `${COMPANY_IMAGE}${item?.company_info?.company_image}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{marginHorizontal: wp('3%'), flex: 1}}>
              <Text style={[MainStyling.buttonText, styles.title]}>
                {item?.name}
                {/* {item?.scheduling_status} */}
                {/* {item?.id} */}
              </Text>
              {/* <Text style={[MainStyling.label, {color: colors.gray}]}>
              {item?.scheduling_status}
              {item?.scheduling_status === '1'
                ? 'Ongoing'
                : item?.scheduling_status === '2'
                ? 'Started'
                : 'Completed'}
            </Text> */}
              <Text style={[MainStyling.label, {color: colors.gray}]}>
                {item?.time}
                {/* {item?.day} {item?.month} */}
              </Text>

              <Text
                style={[MainStyling.label, {color: colors.gray}, styles.cityT]}>
                {item?.address}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp('3%'),
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert(item?.job_date);
                // setIndexes(false);
                navigation.navigate('DetailChatEstimaion', {
                  detailSchedule: item,
                });
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 30,
                },
              ]}>
              <Text style={[MainStyling.buttonText, {color: colors.primary}]}>
                {' '}
                View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('ChatMessages', {jobDetail: item});
              }}
              style={[
                styles.buttonDC,
                {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                },
              ]}>
              <Text style={[MainStyling.buttonText, {color: colors.white}]}>
                {' '}
                Chat
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // marginHorizontal: wp('5%'),
              position: 'absolute',
              right: wp('5%'),
              left: wp('5%'),
              top: 10,
            }}>
            <View
              onPress={() => {}}
              style={[
                {
                  backgroundColor: colors.primary,
                  borderRadius: 30,

                  paddingHorizontal: wp('3%'),
                  paddingVertical: wp('1%'),
                },
              ]}>
              <Text style={[MainStyling.label, {color: colors.white}]}>
                Job number: #{item?.vehicle_number}
              </Text>
            </View>
            {item?.scheduling_status === '2' ? (
              <View
                onPress={() => {}}
                style={[
                  // styles.buttonDC,
                  {
                    backgroundColor: colors.green,
                    borderRadius: 30,

                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Started
                </Text>
              </View>
            ) : item?.scheduling_status === '4' ? (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Completed
                </Text>
              </View>
            ) : item?.scheduling_status === '6' ? (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.green,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Requested
                </Text>
              </View>
            ) : (
              <View
                onPress={() => {}}
                style={[
                  {
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    paddingHorizontal: wp('3%'),
                    paddingVertical: wp('1%'),
                  },
                ]}>
                <Text style={[MainStyling.label, {color: colors.white}]}>
                  Ongoing
                </Text>
              </View>
            )}
          </View>
          {item?.job_date != null ? (
            <View
              style={[
                styles.timerContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text style={[MainStyling.label, {color: colors.gray}]}>
                End Time: {'  '}
              </Text>
              <Text style={[MainStyling.titleHeading, {color: colors.primary}]}>
                {currentTime}
              </Text>
            </View>
          ) : null}
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: wp('5%'),
    marginVertical: wp('3%'),
  },
  image: {
    height: wp('21%'),
    width: wp('23%'),
    borderRadius: 15,
    backgroundColor: colors.light_grey,
  },
  timerContainer: {
    backgroundColor: colors.light_red,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: wp('2%'),
    padding: wp('2%'),
    borderRadius: 10,
  },
  timerText: {
    color: colors.primary,
    fontSize: wp('7%'),
    fontWeight: 'bold',
  },
  viewDC: {
    backgroundColor: colors.light_red,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: wp('2%'),
    padding: wp('2%'),
    marginHorizontal: wp('8%'),
    borderRadius: 10,
  },
  buttonDC: {
    flex: 1,
    height: wp('11%'),
    marginHorizontal: wp('1%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatCards;
