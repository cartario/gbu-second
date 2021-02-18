import React from 'react';

const FileInput = ({ handler, initialImgUrl, disabled }) => {
  const [form, setForm] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState(initialImgUrl);
  const [preview, setPreview] = React.useState(null);
  const inputRef = React.useRef(null);

  const handleHiddenInput = (e) => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const target = e.target.files[0];
    setForm(target);
    setIsLoaded(null);

    setPreview((prev) => {
      if (target) {        
        return URL.createObjectURL(target);
      }
      return initialImgUrl;
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
    const formData = new FormData();

    setIsLoaded(null);
    setIsLoading(true);

    formData.append('posterUrl', form);    

    try {
      const response = await fetch('/api/events/upload/create', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
        headers: {
          'Content-Type': 'form/multipart',
        },
      });

      const data = await response.json();

      setImgUrl(data.cloudinary_url);
      // setPublicId(data.public_id);

      setIsLoaded(true);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (imgUrl) {      
      handler(imgUrl);
      setPreview(imgUrl);
    }
  }, [imgUrl, handler]);

  return (
    <div style={styles.wrap}>
      <h4 style={{margin: 0, backgroundColor: 'lightgrey', borderRadius: '15px 15px 0 0'}}>Постер</h4>
      <div >
        <input ref={inputRef} type="file" onChange={handleChange} style={{ display: 'none' }} disabled={disabled}/>

        <div style={{...styles.btnAdd, backgroundColor: disabled ? 'grey' : 'green'}} onClick={handleHiddenInput}>
          +
        </div>

        <div style={{ marginTop: '20px' }}>
          {preview ? (
            <img width="80%" height="auto" src={preview} alt="previewImg" style={{borderRadius: '15px'}}/>
          ) : (
            <div style={styles.noImg}>нет картинки...</div>
          )}

          {isLoaded && (
            <p style={{ backgroundColor: 'green', color: '#fff', fontSize: '14px' }}>Загружено</p>
          )}

          {form && (
            <div>
              <button disabled={!form || isLoaded} onClick={handleSubmit} style={{margin: '15px'}}>
                {isLoading ? 'Загрузка...' : imgUrl ? 'Сохранить' : 'Загрузить фото'}
              </button>
            </div>
          )}
        </div>

        {error && <p>Error</p>}
      </div>
    </div>
  );
};

export default FileInput;

const styles = {
  wrap: {
    width: '50%',
    margin: '10px auto',
    padding: '0px',
    textAlign: 'center',
    border: '1px solid lightgrey',
    borderRadius: '15px'
  },
  noImg: {
    width: '150px',
    height: '100px',
    margin: '10px auto',    
    borderRadius: '15px',
    border: '1px dashed lightgrey'
  },
  btnAdd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    margin: '10px auto',
    borderRadius: '10px',
    backgroundColor: 'green',
    color: '#fff',
    cursor: 'pointer',
  },
};
