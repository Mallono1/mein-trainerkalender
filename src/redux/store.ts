import { combineReducers, configureStore } from '@reduxjs/toolkit';
import globalSlice from './../slicers/globalSlicer/globalSlicer';
import userSlice from './../slicers/userSlicer';
import taskSlice from './../slicers/taskSlicer';

const rootReducer = combineReducers({
  global: globalSlice,
  user: userSlice,
  task: taskSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
