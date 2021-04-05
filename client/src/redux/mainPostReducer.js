import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false, 
  date: '',
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
    setDate: (state, action)=>{
      state.date = action.payload
    },
    setTitle: (state, action)=>{
      state.title = action.payload
    },
    setAddress: (state, action)=>{
      state.address = action.payload
    },
    setCategory: (state, action)=>{
      state.age_category = action.payload
    },
    setMainPostForm: (state, action)=>{
      return {...state, ...action.payload}      
    },

  }
});

export const {setVisible, setDisabled, setMainPostForm, setPoster, setDate, setTitle, setAddress, setCategory} = mainPostSlice.actions;

export default mainPostSlice.reducer;