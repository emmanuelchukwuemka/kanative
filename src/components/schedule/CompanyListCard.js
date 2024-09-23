import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {COMPANY_IMAGE, COMPANY_IMAGE_URL, Image_URL} from '../../apis/apis';
import FastImage from 'react-native-fast-image';

const CompanyListCard = ({
  item,
  setSelectedCompanyDetail,
  selectedCompany,
  setselectedCompany,
}) => {
  const userDetails = useSelector(state => state.auth.user);

  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCompanyDetail(item);
        setselectedCompany(item?.company_name);
      }}
      style={[
        styles.imagecard,
        {
          borderColor:
            selectedCompany === item?.company_name
              ? colors.primary
              : colors.black,
          borderWidth: selectedCompany === item?.company_name ? 2 : 1,
        },
      ]}>
      <FastImage
        style={{
          height: wp('14.5%'),
          width: wp('14.5%'),
          resizeMode: 'cover',
          borderRadius: 300,
        }}
        source={{
          uri: `${COMPANY_IMAGE}${item?.company_image}`,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePhone: {
    height: wp('10%'),
    width: wp('10%'),
  },
  scheduleV: {
    borderRadius: 10,
    marginVertical: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4.5%'),
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 3,
  },
  image: {
    height: wp('17%'),
    width: wp('17%'),
    borderRadius: 10,
  },
  imagecard: {
    height: wp('15.5%'),
    width: wp('15.5%'),
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('1%'),
    marginVertical: wp('2.5%'),
  },
});

export default CompanyListCard;
