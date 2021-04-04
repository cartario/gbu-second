import React, {useCallback} from 'react';

const useHttp = () => {
  const [loading, setLoading] = React.useState(false);  
  const [error, setError] = React.useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}, mode = 'cors') => {
    setLoading(true)
    try{

      if(body && headers['Content-Type']!=='form/multipart'){
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json'        
      }      

      const response = await fetch(url, {method, body, headers, mode});      
      const data = await response.json();
      
      return data;
    }
    catch(err){
      setError('err here')
    }
    finally{
      setLoading(false)
    }
  },[])  

  const clearError = useCallback(() => {
    setError(null)
  },[]) 


  return {request, loading, error, clearError}
};

export default useHttp;
