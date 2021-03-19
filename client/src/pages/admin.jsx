import React from 'react';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';
import Login from '../components/login';
import AdminContent from '../components/admin-content';

const Admin = ({paths}) => {
  const auth = useContext(AuthConext);
  
  if(auth.isAuth){
    return (<AdminContent paths={paths}/>);
  }

  return (<Login />);
}

export default Admin;
