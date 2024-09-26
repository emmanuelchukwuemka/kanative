import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainStyling from '../../assets/styles/MainStyling';
import colors from '../../assets/colors/colors';

const SingleReel = ({item, index, currentIndex}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const videoRef = useRef(null);

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };

  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(item.isLike);

  return (
    <View
      style={{
        width: wp('100%'),
        height:  wp('204%'),
     }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={item.video}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
     <View style={{flex:2.5}}></View>
      <View
        style={
          {
            flex:1,
          }
        }>
        <View style={[MainStyling.screenPadding]}>
          <TouchableOpacity style={{}}>
            <View
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: wp('11%'),
                  height: wp('11%'),
                  borderRadius: 300,
                  backgroundColor: colors.white,
                  
                }}>
                <Image
                  source={item.postProfile}
                  style={{
                    width: wp('11%'),
                    height: wp('11%'),
                    resizeMode: 'cover',
                    borderRadius: 300,
                  }} 
                />
              </View>
              <View style={{marginLeft: wp('1.5%')}}>
           <Text style={[MainStyling.mediumText,{color: colors.white, }]}>{item.title}</Text>
          <Text style={[MainStyling.miniText,{color: colors.white, }]}>{item.time}</Text>
           
                </View>

            </View>
          </TouchableOpacity>
          <View style={{minHeight: wp('1%')}}></View>

          <Text style={[MainStyling.paragraph,{color: colors.white, width: wp('50%') }]}>
          {item.description.split(' ').length > 10 
    ? item.description.split(' ').slice(0, 10).join(' ') + '...' 
    : item.description}
          </Text>
          <View style={{minHeight: wp('2%')}}></View>
          
          <View style={{flexDirection: 'row', }}>
            <Ionicons
              name="musical-notes"
              style={{color: colors.white, fontSize: wp('8%')}}
            />
            <Text style={{color: colors.white}}>Original Audio</Text>
          </View>
          <View style={[MainStyling.divider]}></View>
        </View>
     
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={() => {}} style={{alignItems: 'center'}}>
          <AntDesign
            name={'eye'}
            style={{color: colors.white, fontSize: wp('7%')}}
          />
          <Text style={[MainStyling.paragraph, {color: colors.white}]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLike(!like)} style={{alignItems: 'center'}}>
          <AntDesign
            name={like ? 'heart' : 'hearto'}
            style={{color: like ? colors.red : colors.white, fontSize: wp('6%')}}
          />
          <Text style={[MainStyling.paragraph, {color: colors.white}]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center'}}>
          <Feather name="film" style={{color: colors.white, fontSize: wp('7%')}} />
          <Text style={[MainStyling.paragraph, {color: colors.white}]}>
            {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Ionicons
            name="arrow-redo"
            style={{color: colors.white, fontSize: wp('7%')}}
          />
          <Text style={[MainStyling.paragraph, {color: colors.white}]}>
            {item.likes}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default SingleReel;
