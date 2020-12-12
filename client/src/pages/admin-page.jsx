import React from 'react';
import useHttp from '../hooks/http.hook';
import {useContext} from 'react';
import {AuthConext} from '../context/auth.context';

const AdminPage = () => {
  const {request, loading, error, clearError} = useHttp();
  const [users, setUsers] = React.useState(null);
  const auth = useContext(AuthConext);

  React.useEffect(()=>{
    async function fetchUsers(){
      const response = await request('api/auth/users');
      setUsers(response);
    };
    fetchUsers()
  },[request]);
  
  
  return (
    <>
      <h1>AdminPage</h1>
      <a href="/">На главную</a>  
      
      {loading ? <p>Loading...</p> : JSON.stringify(users)}  

      <a href="/login" onClick={()=>auth.logout()}>Logout</a>
    </>
    );
};

export default AdminPage;
