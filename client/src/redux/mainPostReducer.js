import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  disabled: false,
  visible: false,
  select: ''
}

const mainPostSlice = createSlice({
  name: 'mainPost',
  initialState,
  reducers: {
    setDisabled: (state, action)=>{
      state.disabled = action.payload
    },
    setVisible: (state, action)=>{
      state.visible = action.payload
    },
    setMainPostForm: (state, action)=>{
      return {...state, ...action.payload}      
    },

  }
});

export const {setVisible, setDisabled, setMainPostForm} = mainPostSlice.actions;

export default mainPostSlice.reducer;