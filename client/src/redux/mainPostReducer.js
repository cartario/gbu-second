import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false, 
  date: '',
  title: 'title',
  address: 'address',
  age_category: '6+', 
  posterUrl: '',
  colorContact: '',
  website: 'центрданиил.рф',
  phone: '+7-123-456-78-90',
  addressContact: 'Люсиновская, 53',
  social: 'vk.com/centerdaniil',
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
    setColorContact: (state, action)=>{
      state.colorContact = action.payload
    },
    setWebsite: (state, action)=>{
      state.website = action.payload
    },
    setPhone: (state, action)=>{
      state.phone = action.payload
    },
    setAddressContact: (state, action)=>{
      state.addressContact = action.payload
    },
    setSocial: (state, action)=>{
      state.social = action.payload
    },

    setMainPostForm: (state, action)=>{
      return {...state, ...action.payload}      
    },
  }
});

export const {setVisible, setDisabled, setMainPostForm, setPoster, setDate, setTitle, 
  setAddress, setCategory, setColorContact,
  setWebsite, setPhone, setAddressContact, setSocial

} = mainPostSlice.actions;

export default mainPostSlice.reducer;