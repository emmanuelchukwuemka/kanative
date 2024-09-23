import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
} from 'react-native';
import colors from '../assets/colors/colors';
import MainStyling from '../assets/styles/MainStyling';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  buttonStyle,
  label,
  labelStyle,
  onPress,
  variant,
  outerStyle,
}) => {
  return (
    <>
      {variant === 'outline' ? (
        <SafeAreaView style={[{backgroundColor: colors.white, ...outerStyle}]}>
          <Pressable
            onPress={() => {
              onPress();
            }}
            style={[
              Styles.button,
              Styles.outlineButton,
              Styles.shadowContainer,
              {backgroundColor: colors.white, ...buttonStyle},
            ]}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: colors.primary,
                  fontWeight: 'bold',
                },
                labelStyle,
              ]}>
              {label}
            </Text>
          </Pressable>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={[{backgroundColor: colors.white, ...outerStyle}]}>
          <View style={[Styles.shadowContainer, buttonStyle]}>
            <LinearGradient
              colors={[colors.light_primary, colors.primary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={Styles.button}>
              <Pressable onPress={onPress} style={Styles.pressable}>
                <Text
                  style={[
                    {
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    },
                    MainStyling.buttonText,
                    labelStyle,
                  ]}>
                  {label}
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: colors.transparent, // Ensures shadow is visible
      },
      android: {
        elevation: 2,
      },
    }),
  },
  button: {
    flexDirection: 'row',
    height: wp('13%'),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
