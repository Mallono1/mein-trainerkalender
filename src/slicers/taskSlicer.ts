import { createSlice } from '@reduxjs/toolkit';

interface TaskSlicer {
  viewLayout: 'calendar';
}

const initialState: TaskSlicer = {
  viewLayout: 'calendar',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setViewLayout: (state, action) => {
      state.viewLayout = action.payload;
    },
  },
});

export const { setViewLayout } = taskSlice.actions;
export default taskSlice.reducer;
