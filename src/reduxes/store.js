import {configureStore} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    // storage: AsyncStorage,
    auth: authSlice,
  },
});

// import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import authSlice from './authSlice';
// // import commonSlice from './commonSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistReducer, persistStore} from 'redux-persist';
// // import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   counterReducer: counterReducer,
// };

// const reducers = combineReducers({
//   auth: authSlice,
// });

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
