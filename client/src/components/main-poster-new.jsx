import React from 'react';
import useHttp from '../hooks/http.hook';
import Logo from '../components/Logo';
import hexToHsl from 'hex-to-hsl';

const whatsAppPhone = '79032530773';
const URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/mainpost'

const Poster = () => {
  const [data, setData] = React.useState(null);
  const { request } = useHttp();
  const [whatsApp, setWhatsApp] = React.useState('');

  const handleWhatsApp = (e) => {
    setWhatsApp(e.target.value);
  };

  React.useEffect(()=>{
    (async function fetch (){
      const response = await request(`${URL}.json`);      
      setData(Object.values(response)[0]);
    })()
  }, [])

  if(!data){
    return null;
  }  

  const animated = false;
  const { visible, date, title, address, age_category, posterUrl, colorContact, website,
    phone, addressContact, social} = data;

  if(!visible){
    return null;
  }

  const hslArray = hexToHsl(colorContact);
  const darken = `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2] - 15}%)`;
  const lighten = `hsl(${hslArray[0]},${hslArray[1]}%,${hslArray[2] + 15}%)`;
  const contrastColor = `hsl(${hslArray[0] - 180},${hslArray[1]}%,${hslArray[2]}%)`;

  return (
    <div className="wrapper-poster">
      <h1>СОВСЕМ СКОРО:</h1>
      <div className="poster" style={{ backgroundImage: `url(${posterUrl})` }}>
        <div className="poster-top">          
          <Logo opacity={0.7} color='#fff'/>          
          <div className="container-t">
            <div
              className={`poster-top__contacts ${animated ? 'freeze-rotate' : ''}`}
              style={{
                background: `linear-gradient(89.93deg, 	${colorContact} 0.06%, ${darken} 52.77%`,                
              }}
            >
              <ul>
                <li>{website}</li>
                <li>{phone}</li>
              </ul>
              <ul>
                <li>{addressContact}</li>
                <li>{social}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="poster-content">
          <div className="poster-content__title">
            <div className="container-t">
              <div className={`transform ${animated ? 'translate3d' : ''}`}>                
                <h1>{title}</h1>
                <p>{age_category}</p>
              </div>
            </div>
          </div>

          <div className="poster-content__date a_left-right">
            <div className="container-t">
              <div className={`transform ${animated ? 'rotateY' : ''}`}>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{ color: lighten }}
                    className="poster-content__date--date"
                  >
                    {new Date(date).toLocaleDateString()}
                    <br />
                    <p style={{ color: '#fff' }}>
                      {new Date(date).toLocaleTimeString().split(':').slice(0,2).join(':')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {address.length &&<>
        <div className="poster-divider"></div>
        <div className="poster-description"
        style={{          
          backgroundColor: colorContact,
          color: contrastColor
        }}
        >
          <p>МЕСТО ПРОВЕДЕНИЯ: {address}</p>
        </div></>
        }

        <div 
        style={{
          backgroundColor: contrastColor
        }}
        className="poster-bottom">
          <h2>Отправить заявку на WhatsApp:</h2>
          <div className="poster-bottom__whatsapp">
            <input
              className="poster-bottom__whatsapp--input"
              placeholder="Введите ФИО"
              onChange={handleWhatsApp}              
              value={whatsApp}
            />

            <a
              className="poster-bottom__whatsapp--btn shake-btn"
              href={`https://api.whatsapp.com/send/?phone=%2B${whatsAppPhone}&text=${
                'Запись на мероприятие:' + title + '__' + whatsApp
              }&app_absent=0`}
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
