import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studiosWithoutGroupName: [],
  groupNames: [],  
}

const adminStudiosSlice = createSlice({
  name: 'adminStudios',
  initialState,
  reducers: {
    setGroupNames: (state, action)=>{
      state.groupNames = action.payload
    },
    setStudiosWithoutGroupName: (state, action)=>{
      state.studiosWithoutGroupName = action.payload
    },
    removeStudioWithoutGroupNameById: (state, action)=>{
      const id = action.payload;

      return {
        ...state,
        studiosWithoutGroupName: state.studiosWithoutGroupName.filter((each)=>each.id!==id)
      }
      state.studiosWithoutGroupName = action.payload
    },    
  }
});

export const {setGroupNames, setStudiosWithoutGroupName, removeStudioWithoutGroupNameById} = adminStudiosSlice.actions;

export default adminStudiosSlice.reducer;