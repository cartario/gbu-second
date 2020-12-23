import React from 'react';
import useHttp from '../hooks/http.hook';

const VideoPlayer = () => {
  const [mainPost, setMainPost] = React.useState(null);
  const {request} = useHttp();

  const getMainPost = React.useCallback(async () => {
    try {
      const response = await request(`/api/mainpost`);
      setMainPost(response);
    } catch (err) {}
  }, [request]);

  React.useEffect(() => {
    getMainPost();
  }, [getMainPost]);
 
  if(!mainPost){
    return null;
  } 

  return (
    <>
      {mainPost[0].videoplayer_visible ? 
      <div className="videoplayer">
      <h3>{mainPost[0].videoplayer_title}</h3>
      <iframe        
        // width="560"
        // height="315"
        src={mainPost[0].videoplayer_url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div> : ""}
    </>
  );
};

export default VideoPlayer;
