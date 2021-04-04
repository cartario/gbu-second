import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false, 
  title: 'title',
  address: 'address',
  age_category: '6+', 
  posterUrl: '',
  disabled: false
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
    setPoster: (state, action)=>{
      state.posterUrl = action.payload
    },
    setMainPostForm: (state, action)=>{
      return {...state, ...action.payload}      
    },

  }
});

export const {setVisible, setDisabled, setMainPostForm, setPoster} = mainPostSlice.actions;

export default mainPostSlice.reducer;