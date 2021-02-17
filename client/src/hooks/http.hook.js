import React, {useCallback} from 'react';

const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = useCallback(async (url, method = 'GET', body=null, headers={})=> {
    setLoading(true)
    try {
      if(body){
        
        body = JSON.stringify(body);
        
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers});
      const data = await response.json();

      if(!response.ok){
        
        throw new Error(data.message||'что-то пошло не так');        
      }

      setLoading(false);
      return data;
    }
    catch(err){
      
      setError(err.message);
      setLoading(false);
      throw err;
    }
  },[error]);

  const clearError = useCallback(()=>{    
    setError(null);
  },[]);

  return {request, loading, error, clearError}
};

export default useHttp;
