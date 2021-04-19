import React from 'react';
import { Dialog } from '@material-ui/core';
import useHttp from '../../hooks/custom.hook';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/studios';

export default function StudioModal ({modal, handleToggleModal, id}){
  const {request} = useHttp();
  const [data, setData] = React.useState(null);

  React.useEffect(()=>{
    if(id){
      (async function(){
        const resData = await request(`${BASE_URL}/${id}.json`);
        setData(resData)
      })()
    }    
  },[id])

  if(!data){
    return (<Dialog onClose={()=>handleToggleModal(false)} aria-labelledby="modal" open={modal}>
    <p>Loading...</p>
  </Dialog>)
  }

  const {studio_name, sub_studio_number} = data;

  return (
    <Dialog onClose={()=>handleToggleModal(false)} aria-labelledby="modal" open={modal}>
      <p>{studio_name}</p>  
      <p>{sub_studio_number}</p>  
    </Dialog>
  )
}