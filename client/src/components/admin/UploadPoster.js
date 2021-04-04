import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import initialPoster from '../../img/initialPoster.png';
import {Backdrop, CircularProgress} from '../mui'

const useStyles = makeStyles((theme) => ({
  posterImg: {
    width: '200px',
    height: '200px',
    marginTop: '15px',
    borderRadius: '15px',
    cursor: 'pointer'
  }
}));

const posterUrl = 'https://res.cloudinary.com/dhefjj9ig/image/upload/v1616423070/%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%D1%8B%28%D0%B4%D0%BB%D1%8F%20%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0%20%D0%A1%D0%BE%D0%B2%D1%81%D0%B5%D0%BC%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%29/sports_2_1_wizin7.png'

export default function UploadPoster ({initial, setDisableSubmitButton, name, onChange}) {
  const classes = useStyles();
  const inputRef = React.useRef(null);  

  const [posterImg, setPoster] = React.useState(initial);
  const [error, setError] = React.useState(null); 
  const [loader, setLoader] = React.useState(false); 
  const [status, setStatus] = React.useState(null);

  const handleChange = async (e) => {
    const target = e.target.files[0]; 

    if(target?.type==='image/jpeg' || target?.type==='image/png'){
      const formData = new FormData();

      formData.append('posterUrl', target);
      setLoader(true);
      setStatus(null);
      setDisableSubmitButton(true);

     try{
      const response = await fetch('/api/events/upload/create/mainpost', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'form/multipart',
        },
      });

      setLoader(false);

      if(response.ok){
        setStatus('Сохранено');
        const data = await response.json();
        setPoster(data.cloudinary_url);
        onChange({
          name,
          value: data.cloudinary_url
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

      {loader && <CircularProgress/>}
      <p style={{color: 'red'}}>{error}</p>      
      <p>{status}</p>
    </>)
};
