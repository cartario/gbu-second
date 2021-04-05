import React from 'react';
import useHttp from '../hooks/http.hook';
import Logo from '../components/Logo'

const adapterMainPoster = (dataServer) => {
  return {
    visible: dataServer.visible,
    background:
      dataServer.background ||
      'https://res.cloudinary.com/dxioiveim/image/upload/v1608709447/posters/1x/sports_2_1_dpjzl0.jpg',
    logo: {
      color: dataServer.logo_color,
      opacity: 0.75,
    },
    contacts: {
      background: [
        dataServer.contacts_background_1 || '#E16E1D',
        dataServer.contacts_background_2 || '#7F1F08',
      ],
      color: dataServer.contacts_color,
      site: 'centerdaniil.ru',
      phone: '8-499-237-90-40',
      address: dataServer.address || 'Люсиновская, 53',
      social: 'vk.com/centerdaniil',
    },
    title: {
      background: dataServer.title_bg,
      color: dataServer.title_color,
      content: dataServer.title_content,
      contentType: dataServer.title_contentType,
      align: 'center',
      top: '56px',
      borderRadius: '15px',
    },
    date: {
      date: dataServer.date_date,
      time: dataServer.date_time,
    },
  };
};

const URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/mainpost'

const Poster = () => {
  const [mainPost, setMainPost] = React.useState(null);
  const { request } = useHttp();
  const [whatsApp, setWhatsApp] = React.useState('');

  const handleWhatsApp = (e) => {
    setWhatsApp(e.target.value);
  };

  const getMainPost = React.useCallback(async () => {
    try {
      const response = await request(`/api/mainpost`);
      setMainPost(response);
    } catch (err) {}
  }, [request]);

  React.useEffect(() => {
    getMainPost();
  }, [getMainPost]);

  if (!mainPost) {
    return null;
  }

  const data = adapterMainPoster(mainPost[0]);

  if(!data.visible){
    return null;
  }

  return (
    <div className="wrapper-poster">
      <h1>СОВСЕМ СКОРО:</h1>
      <div className="poster" style={{ backgroundImage: `url(${data.background})` }}>
        <div className="poster-top">
          
          <Logo opacity={0.7} color={data.logo.color}/>

          <div className="container-t">
            <div
              className="poster-top__contacts freeze-rotate"
              style={{
                background: `linear-gradient(89.93deg, ${data.contacts.background[0]} 0.06%, ${data.contacts.background[1]} 52.77%`,
                color: data.contacts.color,
              }}
            >
              <ul>
                <li>{data.contacts.site}</li>
                <li>{data.contacts.phone}</li>
              </ul>
              <ul>
                <li>{data.contacts.address}</li>
                <li>{data.contacts.social}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="poster-content">
          <div
            className="poster-content__title"
            style={{
              background: 'rgba(0, 0, 0, 0.69)',
              
              marginTop: data.title.top,
              textAlign: data.title.align,
              borderRadius: data.title.borderRadius,
            }}
          >
            <div className="container-t">
              <div className="transform translate3d">
                <p style={{ color: '#fff' }}>{data.title.contentType}</p>
                <h1 style={{}}>{data.title.content}</h1>
              </div>
            </div>
          </div>

          <div className="poster-content__date a_left-right">
            <div className="container-t">
              <div className="transform rotateY">
                <div style={{ display: 'flex' }}>
                  <div
                    style={{ color: data.contacts.background[0] }}
                    className="poster-content__date--date"
                  >
                    {data.date.date}
                    <br />
                    <p style={{ color: '#fff', margin: 0, padding: 0, fontSize: '30px' }}>
                      {data.date.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="poster-bottom">
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
              href={`https://api.whatsapp.com/send/?phone=%2B79032530773&text=${
                'Запись на мероприятие:' + data.title.content + '__' + whatsApp
              }&app_absent=0`}
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
