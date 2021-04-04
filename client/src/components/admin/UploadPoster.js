import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress, Modal} from '../mui';
import useUpload from '../../hooks/uploadFile.hook';
import {useSelector, useDispatch} from 'react-redux';
import {setPoster, setDisabled} from '../../redux/mainPostReducer'

const useStyles = makeStyles((theme) => ({
  posterImg: {
    width: '200px',
    height: '200px',
    marginTop: '15px',
    borderRadius: '15px',
    cursor: 'pointer'
  }
}));

export default function UploadPoster () {
  const classes = useStyles();
  const inputRef = React.useRef(null);  
  const {upload, status, loading} = useUpload();
  
  const {posterUrl: poster} = useSelector((state)=>state.mainPost);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const target = e.target.files[0]; 

    const file = await upload('posterUrl', '/api/events/upload/create/mainpost', target);

    if(file){
      dispatch(setPoster(file.cloudinary_url));     
    } 
  };

  const handlePosterClick = () => {
    inputRef.current.click();
  }

  React.useEffect(()=>{   
    dispatch(setDisabled(loading));  
  }, [loading, dispatch])

  return (
    <>      
      <input ref={inputRef} type='file' onChange={handleChange} style={{display: 'none'}}/>
      <img className={classes.posterImg} src={poster} alt="preview"
      onClick={handlePosterClick}
      />
      {loading && <CircularProgress/>}      
      <p>{status}</p>      
    </>)
};
