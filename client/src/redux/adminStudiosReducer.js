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
      });

      // const studiosWithGroupName = allStudios.filter((each)=>each.group_name)

      state.allStudios = action.payload;
      state.groupNames = uniqGroupNames;
      state.studiosWithoutGroupName = studiosWithoutGroupName;
      state.studiosWithGroupName = studiosWithGroupName;
    },
    addStudio: (state, action)=>{
      state.allStudios = [...state.allStudios, action.payload];
      state.studiosWithoutGroupName = [...state.studiosWithoutGroupName, action.payload]
    },
    addStudioWithGroupName: (state, action)=>{      
      state.studiosWithGroupName = [...state.studiosWithGroupName, action.payload]
    },
    removeStudioWithGroupName: (state, action)=>{
      const id = action.payload;
      let studiosWithGroupName = state.studiosWithGroupName.map((group)=>group.filter((each)=>each.id!==id));
      
      if(![].concat.apply([],studiosWithGroupName).length){
        studiosWithGroupName = []
      }

      return {...state, 
        studiosWithGroupName
      }
    },
    setGroupNames: (state, action)=>{
      state.groupNames = action.payload
    },
    setStudiosWithoutGroupName: (state, action)=>{
      state.studiosWithoutGroupName = action.payload
    },
    
    addStudioWihoutGroupName: (state, action)=>{
      const id = action.payload;
      const newStudio = state.allStudios.find((studio)=>studio.id===id)
      
      return {...state,
        studiosWithoutGroupName: [...state.studiosWithoutGroupName, newStudio]
      }
    },
    removeStudioWithoutGroupNameById: (state, action)=>{
      const id = action.payload;

      return {
        ...state,
        studiosWithoutGroupName: state.studiosWithoutGroupName.filter((each)=>each.id!==id)
      }
      
    },
       
  }
});

export const {setAllStudios, setGroupNames, setStudiosWithoutGroupName,
  removeStudioWithoutGroupNameById, addStudio, addStudioWithGroupName, removeStudioWithGroupName, addStudioWihoutGroupName} = adminStudiosSlice.actions;

export default adminStudiosSlice.reducer;