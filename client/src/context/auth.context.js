import {createContext} from 'react';

const initialState = {
  token: null,
  userId: null,
  login: ()=>{},
  logout: ()=>{},
  isAuth: false,
};

export const AuthConext = createContext(initialState);
