import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Headers from '../../components/Headers';
import colors from '../../assets/colors/colors';
import MainStyling from '../../assets/styles/MainStyling';
import ConsistencyCard from '../../components/SettingsCard/Consistency';
import ActionCard from '../../components/SettingsCard/ActionCard';

const Settings = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Consistency');

  const renderTab = tabName => (
    <TouchableOpacity
      style={[styles.tabText, selectedTab === tabName && styles.selectedTab]}
      onPress={() => setSelectedTab(tabName)}>
      <Text
        style={[
          MainStyling.header,
          {
            color: selectedTab === tabName ? colors.primary : colors.black,
          },
        ]}>
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[MainStyling.mainContainer]}>
      <Headers iconLeft={false} title={'Hello, Jasmine'} />

      <View style={styles.tabContainer}>
        {renderTab('Consistency')}
        {renderTab('Actions')}
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === 'Consistency' && <ConsistencyCard />}
        {selectedTab === 'Actions' && <ActionCard />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp('3%'),
    marginTop: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.light_grey,
  },
  tabText: {
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('4%'),
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
    marginTop: wp('2%'),
  },
});

export default Settings;
