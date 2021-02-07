import React from 'react';

const WhatsApp = ({title=""}) => {
  const [whatsApp, setWhatsApp] = React.useState('');
  const PHONE_NUMBER = '79032530773'

  const handleWhatsApp = (e) => {
    setWhatsApp(e.target.value);
  };
  
  return (
    <div className="detail-page__contact">
      <h3>Отправить заявку или задать вопрос</h3>
      <div>
        <input placeholder="введите сообщение" value={whatsApp} onChange={handleWhatsApp} />
      </div>
      <a href={`https://api.whatsapp.com/send/?phone=%2B${PHONE_NUMBER}&text=${"Запись в студию:"+title+"__"+whatsApp}&app_absent=0`}>
        Отправить
      </a>
    </div>
  );
};


export default WhatsApp;
