import {configureStore} from '@reduxjs/toolkit';
import selectorState from './../redux/SelectorSlice';

export const MyStore = configureStore({
  reducer: {
    selector: selectorState,
  },
});
