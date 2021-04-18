import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allStudios: [],
  studiosWithoutGroupName: [],
  studiosWithGroupName: [],
  groupNames: [],  
}

const adminStudiosSlice = createSlice({
  name: 'adminStudios',
  initialState,
  reducers: {
    setAllStudios: (state, action)=>{
      const allStudios = action.payload;
      const uniqGroupNames = [
        ...new Set(allStudios.filter((each) => each.group_name).map((item) => item.group_name)),
      ];
      
      const studiosWithoutGroupName = allStudios.filter((each) => !each.group_name);
      const studiosWithGroupName = uniqGroupNames.map((item) => {
        return allStudios.filter((each) => each.group_name === item);
      })

      state.allStudios = action.payload;
      state.groupNames = uniqGroupNames;
      state.studiosWithoutGroupName = studiosWithoutGroupName;
      state.studiosWithGroupName = studiosWithGroupName;
    },
    addStudio: (state, action)=>{
      state.allStudios = [...state.allStudios, action.payload];
      state.studiosWithoutGroupName = [...state.studiosWithoutGroupName, action.payload]
    },
    setGroupNames: (state, action)=>{
      state.groupNames = action.payload
    },
    setStudiosWithoutGroupName: (state, action)=>{
      state.studiosWithoutGroupName = action.payload
    },
    setStudiosWithGroupName: (state, action)=>{
      state.studiosWithGroupName = action.payload
    },
    removeStudioWithoutGroupNameById: (state, action)=>{
      const id = action.payload;

      return {
        ...state,
        studiosWithoutGroupName: state.studiosWithoutGroupName.filter((each)=>each.id!==id)
      }
      
    },
    showStudioWithoutGroupNameById: (state, action)=>{
      
      return {
        ...state,
        studiosWithoutGroupName: state.allStudios
      }      
    },    
  }
});

export const {setAllStudios, setGroupNames, setStudiosWithoutGroupName, setStudiosWithGroupName, showStudioWithoutGroupNameById,
  removeStudioWithoutGroupNameById, addStudio} = adminStudiosSlice.actions;

export default adminStudiosSlice.reducer;