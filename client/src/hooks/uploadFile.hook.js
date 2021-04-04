import React, {useCallback} from 'react';

const useUpload = () => {
  const [status, setStatus] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const upload = useCallback(async (inputName, url, file) => {

    if(file?.type==='image/jpeg' || file?.type==='image/png'){
      const formData = new FormData();
      formData.append(inputName, file);     
      setStatus(null);      
      setLoading(true);

      try{
        const response = await fetch(url, {
          mode: 'no-cors',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'form/multipart'
          }
        });
  
        const data = await response.json();
  
        setLoading(false)
  
        if(response.ok){
          setStatus('Сохранено');
        }
  
        else{
          setStatus('Fail')
        }
  
        return data;
      }
      catch(err){
        setError(err.message)
      }
    }

    else{
      setStatus('Тип файла не подходит')
    }
  }, [])

  React.useEffect(()=>{
    if(status){
      setTimeout(()=>{
        setStatus(null)
      },2000)
    }

    if(error){
      setTimeout(()=>{
        setError(null)
      },2000)
    }
  }, [status, error])

  return {status, upload, loading, error}
};

export default useUpload;
