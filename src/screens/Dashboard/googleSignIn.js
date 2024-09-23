import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Initialize the Google SDK
GoogleSignin.configure({
  webClientId:
    '275229967551-q2v2psf7u7huaaurdg66sj2k464bf1gr.apps.googleusercontent.com',
  androidClientId:
    '275229967551-etr4mm6127ojc4r8l49q85vdd80sdegt.apps.googleusercontent.com', // Replace with your actual web client ID
  offlineAccess: true,
});

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the sign-in
      console.error('Sign in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation (e.g. sign in) is in progress already
      console.error('Sign in in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
      console.error('Play services not available');
    } else {
      // Some other error happened
      console.error('Some other error happened', error);
    }
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error(error);
  }
};
