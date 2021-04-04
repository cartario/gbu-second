import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress} from '../mui';
import useHttp from '../../hooks/custom.hook'

const useStyles = makeStyles((theme) => ({
  posterImg: {
    width: '200px',
    height: '200px',
    marginTop: '15px',
    borderRadius: '15px',
    cursor: 'pointer'
  }
}));

export default function UploadPoster ({initial, setDisableSubmitButton, name, onChange}) {
  const classes = useStyles();
  const inputRef = React.useRef(null);  

  const {request, loading} = useHttp();

  const [posterImg, setPoster] = React.useState(initial);
  const [error, setError] = React.useState(null);  
  const [status, setStatus] = React.useState(null);

  const handleChange = async (e) => {
    const target = e.target.files[0]; 

    if(target?.type==='image/jpeg' || target?.type==='image/png'){
      const formData = new FormData();

      formData.append('posterUrl', target);      
      setStatus(null);
      setDisableSubmitButton(true);

     try{
     const response = await request('/api/events/upload/create/mainpost', 'POST', formData, {'Content-Type': 'form/multipart'}, 'no-cors')

      if(response){
        setStatus('Сохранено');        
        setPoster(response.cloudinary_url);

        onChange({
          name,
          value: response.cloudinary_url
        })
      }
      else{
        setStatus('Fail')
      }
     }
     catch(err){
       console.log(err);       
     }

     finally{
       setDisableSubmitButton(false)
     }      
    }

    else {
      setError('Тип файла не подходит')
    }    
  };

  const handlePosterClick = () => {
    inputRef.current.click();
  }

  React.useEffect(()=>{
    setPoster(initial);

    if(error){
      setDisableSubmitButton(true);

      setTimeout(()=>{
        setError(null)
      },2000)
    }

    if(status){
      setTimeout(()=>{
        setStatus(null)
      },2000)
    }
  }, [error, status, initial])

  return (
    <>
      <input ref={inputRef} type='file' onChange={handleChange} style={{display: 'none'}}/>
      <img className={classes.posterImg} src={posterImg} alt="preview"
      onClick={handlePosterClick}
      />

      {loading && <CircularProgress/>}
      <p style={{color: 'red'}}>{error}</p>      
      <p>{status}</p>
    </>)
};
