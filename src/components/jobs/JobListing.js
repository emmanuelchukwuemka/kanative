// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   Image,
// } from 'react-native';
// import colors from '../../constants/colors';
// import MainStyling from '../../assets/styles/MainStyling';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Button from '../Button';
// import JobListingCard from './card/JobListing';
// import {useNavigation} from '@react-navigation/native';
// import {jobLists} from '../../apis/job-apis';
// import {useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../Loader';

// const 
// JobListing = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();
//   const [invites, setInvites] = useState([]);

//   const getAllJobs = async () => {
//     setIsLoading(true);

//     const details = {
//       companyID: JSON.parse(await AsyncStorage.getItem('@emailStores'))?.id,
//     };
//     jobLists(details)
//       .then(response => {
//         console.log('Response: jobsss: ', response);
//         setInvites(response?.jobs);
//         setIsLoading(false);

//       })
//       .catch(({response}) => {
//         console.log(response);
//         setIsLoading(false);

//       });
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getAllJobs();
//       //   alert('ok');
//     });
//     return unsubscribe;
//   }, []);

//   const itemCard = ({item}) => {
//     return <JobListingCard item={item} />;
//   };

//   return (
//     <SafeAreaView style={MainStyling.mainContainer}>
//       {
      
      
//       isLoading?(
//         <Loader/>
             
//       ):(
      
    
//       invites.length > 0 ? (
//         <View style={{flex: 1}}>
//           <FlatList
//             data={invites}
//             showsVerticalScrollIndicator={false}
//             keyExtractor={item => item.id}
//             renderItem={itemCard}
//           />
//         </View>
//       ) : (
//         <SafeAreaView
//           style={[MainStyling.mainContainer, MainStyling?.screenPadding]}>
//           <View style={[MainStyling.alignmentCenter, {flex: 1}]}>
//             <Text style={[MainStyling.buttonText, styles.title]}>
//               No job yet!
//             </Text>
//             <Text
//               style={[
//                 MainStyling.label,
//                 {
//                   color: colors.grayLight,
//                   textAlign: 'center',
//                   marginHorizontal: wp('10%'),
//                 },
//               ]}>
//               Jobs according to the skills you have, there are thousands of jobs
//               listed
//             </Text>
//           </View>
//         </SafeAreaView>
//       )
//     )
      
      
      
//       }
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     color: colors.black,
//     fontWeight: 'bold',
//     marginVertical: wp('2%'),
//   },
// });

// export default JobListing;
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
// import React, { useRef, useState } from 'react'
// import RBSheet from 'react-native-raw-bottom-sheet';
// import colors from '../../assets/colors/colors';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import MainStyling from '../../assets/styles/MainStyling';


// const JobListing = () => {
//   const dropDownUserRef = useRef();
//   const [users, setUsers] = useState([
//     {
//       subTitle: 'Mike Myers',
//     },
//     {
//       subTitle: 'Employee 2',
//     },
//     {
//       subTitle: 'Employee 3',
//     },
//     {
//       subTitle: 'Employee 4',
//     },
//     {
//       subTitle: 'Employee 5',
//     },
//   ]);
//   const DropdownUser = () => {
//     return (
//       <View style={styles.dropDownContainer}>
//         <RBSheet
//           ref={dropDownUserRef}
//           closeOnDragDown={true}
//           height={350}
//           closeOnPressMask={true}
//           customStyles={{
//             wrapper: {
//               backgroundColor: 'rgba(0,0,0,0.6)',
//             },
//             draggableIcon: {
//               backgroundColor: colors.primary,
//               width: wp('13%'),
//             },
//             container: [styles.sheetContainer, MainStyling.screenPadding],
//           }}>
//           {/* // <TouchableOpacity
//           //   style={[styles.bar]}
//           //   onPress={() => {
//           //     dropDownRegionRef.current.close();
//           //   }}></TouchableOpacity> */}
//           <View style={[styles.bar]}></View>
//           <View style={MainStyling.divider}></View>
//           <View style={MainStyling.dividerTwo}></View>

//           <FlatList
            
//             showsHorizontalScrollIndicator={false}
//             vertical={true}
//             data={users}
//             keyExtractor={item => item.id}
//             renderItem={UserCard}
//           />
//            <TouchableOpacity
//             style={[styles.userstouchContainer]}
//             onPress={() => {
             
//               dropDownUserRef.current.close();
//             }}>
           
//             <Text style={[MainStyling.header, {color: colors.white}]}>
//               Select Employee
//             </Text>
//             </TouchableOpacity>
//         </RBSheet>
//       </View>
//     );
//   };
//   const UserCard = ({item}) => {
//     return (
//       <View style={styles.userbox}>
//         <TouchableOpacity >
//         <Text style={MainStyling.buttonText}>{item?.subTitle}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return (
//     <View>
//       <TouchableOpacity  onPress={()=>{
//  dropDownUserRef.current.open();
// }}> 
//       <Text>JobListing</Text>
//       </TouchableOpacity>
//         {DropdownUser()}
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   dropDownContainer: {
//     borderRadius: 50,
//   },
//   sheetContainer: {
//     backgroundColor: colors.white,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   bar: {
//     backgroundColor: colors.gray,
//     width: wp('25%'),
//     height: wp('1.5%'),
//     marginTop: wp('1%'),
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent:'center'
//   },
//   userbox: {
  
//     paddingHorizontal: wp('2%'),
//     padding: wp('0.5%'),
//     marginVertical: wp('2%'),
//     marginBottom: wp('1%'),
//   },
//   userstouchContainer: {
//     //  justifyContent:'center',
    
//     alignItems: 'center',
//     // borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: wp('5%'),
//     padding: wp('3%'),

//     backgroundColor: colors.primary,
//     width: wp('80%'),
//   },
// })
// export default JobListing;

import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const employees = [
  {id: 1, name: 'John Doe'},
  {id: 2, name: 'Jane Smith'},
  {id: 3, name: 'Michael Brown'},
];

const EmployeeSelection = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const toggleSelection = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      // If the employee is already selected, remove them
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      // If the employee is not selected, add them
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => toggleSelection(item.id)}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <CheckBox
          value={selectedEmployees.includes(item.id)}
          onValueChange={() => toggleSelection(item.id)}
        />
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={employees}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={{padding: 20}}>
        <Text>Selected Employees:</Text>
        {selectedEmployees.map(id => (
          <Text key={id}>{employees.find(emp => emp.id === id).name}</Text>
        ))}
      </View>
    </View>
  );
};

export default EmployeeSelection;
