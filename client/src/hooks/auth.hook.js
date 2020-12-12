import React, { useCallback } from 'react';

const useAuth = () => {
  const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const storageName = 'userDataCD';

  const login = useCallback((token, userId) => {
    setToken(token);
    setUserId(userId);
    const storageName = 'userDataCD';
    localStorage.setItem(storageName, JSON.stringify({ token, userId }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  React.useEffect(()=>{
    const dataStorage = JSON.parse(localStorage.getItem(storageName));

    if(dataStorage&&dataStorage.token){
      login(dataStorage.token, dataStorage.userId);
    }
    
  }, [login])

  return { token, userId, login, logout };
};

export default useAuth;
