import React from 'react';

const styles = {
  field: {
    margin: '10px',
  },
  input: {
    width: '50%',
  },
};

const PushNotifications = () => {
  const [showSection, setShowSection] = React.useState(false);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    title: '',
    body: '',
  });

  const isValid = form.title.length && form.body.length;

  const handleClickShowSection = () => {
    setShowSection(!showSection);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (window.confirm('Вы действительно хотите отправить push-уведомление?')) {
      e.preventDefault();

      const responseTokens = await fetch(
        'https://daniil-mobile-default-rtdb.firebaseio.com/expoTokens.json',
      );
      const tokens = await responseTokens.json();

      const adaptedTokens = Object.values(tokens).map((item) => item.token);

      const message = {
        to: adaptedTokens.slice(2), //временно, исключил первые два токена
        sound: 'default',
        title: form.title,
        body: form.body,
        data: { someData: 'goes here2' },
      };

      try {
        const res = await fetch('https://exp.host/--/api/v2/push/send', {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }); 
          
        if(res){
          setSuccesfullSent(true);
  
          setForm({
            title: '',
            body: '',
          });
        } 
        else{
          setError('something went wrong') //TODO отловить ошибку
        } 
      } 
      
      catch(err){
        setError('something went wrong')
        throw err
      }
    }
  };

  React.useEffect(()=>{
    let timer;
    let timerError;

    if(isSuccesfullSent){
      timer = setTimeout(()=>{
        setSuccesfullSent(null);
      }, 3000)
    }

    if(error){
      timerError = setTimeout(()=>{
        setError(null);
      }, 3000)
    }

    return ()=>{
      clearTimeout(timer);
      clearTimeout(timerError);
    }
  },[isSuccesfullSent, error])

  return (
    <div className="admin-section" style={{ backgroundColor: '#ff9800', padding: '10px' }}>
      <h2 onClick={handleClickShowSection} style={{ color: '#e65100' }}>
        Push-уведомления {showSection ? '(свернуть)' : '(развернуть)'}
      </h2>

      {showSection && (
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>
              Заголовок
              <textarea
                style={styles.input}
                placeholder="Короткий заголовок: Уважаемые занимающиеся 1 июля в 12:00 состоится шахматный турнир"
                name="title"
                value={form.title}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </label>
          </div>

          <div style={styles.field}>
            <label>
              Сообщение
              <textarea
                style={styles.input}
                placeholder="Подробное описание: номинации такие-то, правила участия, запись по номеру и через приложение"
                name="body"
                value={form.body}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </label>
          </div>

          {isSuccesfullSent && <p style={{backgroundColor: 'green', padding: '10px'}}>Успешно отправлено</p>}
          {error && <p style={{backgroundColor: 'red', padding: '10px'}}>{error}</p>}
          <button disabled={!isValid}>Send</button>
        </form>
      )}
    </div>
  );
};

export default PushNotifications;
