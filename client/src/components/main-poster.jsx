import React from 'react';
import useHttp from '../hooks/http.hook';

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
          <div style={{ opacity: data.logo.opacity }} className="poster-top__logo a_left-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="58"
              viewBox="0 0 100 58"
              fill="none"
            >
              <g clipPath="url(#clip0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3507 27.5553C9.34095 28.1685 10.2446 28.4866 8.78524 28.7924C6.42214 29.2872 4.33956 28.5025 4.03064 30.0541C4.39283 30.2803 3.96317 30.1743 4.60765 30.2485C5.52733 30.3545 7.6028 29.7325 8.6432 29.6936C9.79901 29.6494 9.36935 29.6176 9.73331 30.1336C8.69469 30.9377 5.69421 30.6762 3.38793 31.2929L3.50334 32.4345C4.17267 32.5829 3.8673 32.4203 4.44964 32.4433C4.5828 32.4486 4.94498 32.3461 5.42257 32.6112L5.47051 33.2969C4.17977 34.1486 3.95607 32.8869 3.47671 34.7406C4.0768 35.2142 3.94009 34.9527 4.6041 35.1842C3.17666 35.6065 2.11318 36.4053 1.51663 37.333L2.52152 37.7872C1.75987 38.4358 0.3484 38.7468 0.00396729 39.6286C1.00176 40.3955 5.06039 39.5455 6.63164 39.3299C9.00006 39.0048 11.3898 38.8281 13.673 38.5011C15.7858 38.199 27.0242 36.4318 28.1196 36.5997L77.1002 28.7093C77.9737 28.2852 94.6591 25.585 98.2047 24.9894C99.2522 24.8127 100.278 24.7456 99.9357 23.6322C99.5842 23.1215 99.4155 23.3972 97.7661 23.7082C95.3746 24.1606 91.7563 24.7367 89.4838 24.6872L89.6862 23.2329L85.5938 23.6959C85.3133 22.3245 86.1406 22.7151 85.4855 21.6725C83.9711 20.6652 81.1268 22.2468 79.1952 21.494C79.7189 21.0964 84.7718 20.0202 85.9454 19.6685C85.924 17.3677 83.6515 17.304 81.5742 17.1998L81.6151 15.7737L73.0185 17.0938C67.7703 17.8324 62.5594 18.8839 57.3929 19.801C52.4466 20.6793 47.5464 22.0224 42.5787 22.8759C37.2951 23.7842 32.0362 24.3108 26.7206 25.1096C24.0752 25.5072 21.6535 26.0285 19.0614 26.4915C17.0499 26.852 12.803 26.9952 11.3525 27.5553H11.3507ZM27.7291 34.5498C28.1942 34.7017 28.6043 34.8184 29.2328 34.6487C29.4512 33.4948 29.0216 34.1999 29.0571 32.8162C30.5058 32.2913 33.0607 31.429 34.5858 31.3159C35.3119 32.0687 35.4096 32.8904 36.4997 33.0441C36.805 32.1411 36.5281 32.2277 36.1091 31.4396C35.3954 30.093 36.4961 31.7135 35.9511 30.0029C34.6479 29.6812 35.1166 30.5825 32.9382 27.8346C32.0789 26.7495 31.5675 25.0972 30.0726 25.5779C29.5844 26.5569 30.2732 26.4067 29.5986 27.8187C28.8618 29.3596 27.1307 33.0477 27.7291 34.5498ZM29.5915 31.2752L33.5897 30.328C33.1921 29.6671 31.6261 27.9088 31.01 27.5147C30.362 28.1827 29.7051 30.1478 29.5897 31.2752H29.5915ZM38.7101 30.2308C39.9795 31.2858 39.3563 29.4816 40.3062 32.749C41.6076 32.3143 40.9223 31.4254 40.7873 29.9163C41.8988 29.554 43.0368 29.1334 44.3524 29.0362C44.5459 30.0117 44.4855 31.4131 45.1034 32.0475C46.3391 31.8301 45.7834 31.4943 45.4248 28.3188C45.3005 27.2196 45.265 24.8834 44.8353 24.0387L43.9192 24.1041C43.486 25.0689 44.118 26.9298 44.2547 28.0448L40.553 28.7835C40.3719 27.4352 40.6204 25.3499 39.8251 24.5671C38.4491 25.076 38.9906 25.8907 39.2179 27.4034C39.644 30.2432 38.964 28.4177 38.7101 30.2308ZM54.0196 26.5675C54.4137 28.0731 53.9486 28.9443 55.1381 29.5222C55.9459 28.7694 55.4399 28.0961 55.3529 26.4085C55.2731 24.8534 55.7009 24.5582 54.7067 23.5474C53.9557 23.8302 53.8776 24.3886 53.4728 25.1962C53.0023 26.1345 50.9694 30.9571 49.6325 30.0011C47.9867 27.7285 50.3942 25.2315 49.8527 23.5863C48.5104 23.6959 48.2637 24.3108 48.0311 26.571C47.8944 27.8858 47.976 30.2556 48.8726 31.0561C51.1931 33.1272 53.4177 27.5836 54.0196 26.5693V26.5675ZM64.0774 24.97C64.697 27.1825 63.8306 27.4617 65.0894 27.9901C65.67 27.7126 65.2971 28.1951 65.5528 27.5253C65.7534 26.9969 65.4374 25.5196 65.4125 24.7685C65.3593 23.1622 65.8244 22.9148 64.7183 22.0718C63.9425 22.4041 63.8999 22.9766 63.5323 23.7913C63.2145 24.4964 62.8577 25.1432 62.5505 25.6786C61.9398 26.7478 61.2136 28.8436 59.8324 28.5432C58.1191 27.6631 60.0738 22.9961 60.0738 22.9925C60.1821 22.3687 60.1857 22.0542 59.3796 22.1372C57.4586 22.3352 57.0946 32.3762 61.2793 29.349C62.1227 28.7376 63.6957 26.4032 64.0756 24.9682L64.0774 24.97ZM68.7166 28.5008C69.6061 28.7358 69.2954 28.8454 70.2683 28.5821C70.7832 26.7919 69.4055 29.4992 70.7885 25.1379C71.0921 24.1818 71.4135 22.3917 71.9958 21.547C73.8618 23.0544 76.1894 26.9863 77.5671 26.9156C77.6364 25.5302 74.0802 22.0842 73.212 20.8154C72.5568 19.8576 72.4095 19.0394 71.0673 19.5413C70.54 20.6917 71.4206 20.1721 70.7335 21.6813C69.9505 23.4025 68.1733 26.7 68.7148 28.499L68.7166 28.5008ZM15.2016 29.0945C15.9864 29.7007 22.6691 30.1531 23.7752 32.6642C23.0135 34.1115 20.9238 35.6896 18.3264 35.7073C18.2216 33.9772 19.2336 33.394 18.5004 31.5032L17.5115 31.6587C17.3535 32.2772 17.1706 35.7073 17.3321 36.3505C20.3184 37.6936 31.1521 33.0282 19.7219 29.0557C18.4134 28.6015 15.3312 26.9598 15.1999 29.0928L15.2016 29.0945Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.5406 5.65316L48.814 6.4042C49.0519 6.16033 48.972 6.1621 49.0218 6.49786C49.8349 7.4804 49.9468 7.03154 50.6605 7.825C53.3609 10.8239 51.5482 14.7434 47.6902 16.3021C45.3928 17.2298 44.9347 16.6308 43.1699 16.447C41.6892 16.0829 39.9262 14.777 40.0967 12.6953C40.2937 10.292 42.0035 10.626 40.5405 7.78259L40.3772 7.61117C39.3918 7.35494 39.2942 6.9909 37.92 7.07572C36.9133 7.13757 35.5445 7.40265 34.5591 7.65005C29.2399 8.98426 23.5319 11.2038 18.4489 13.1671L18.8555 15.521L20.2758 22.0065L20.6415 23.0208C21.3269 24.0299 21.7885 24.484 23.1715 24.5141C27.113 23.7436 24.7392 21.3844 29.3092 20.8826C30.2697 20.7765 31.1751 20.7907 31.8214 21.3809C32.7659 21.5576 33.2151 22.0807 33.7477 22.9448L54.4191 19.1843C54.3995 17.3942 55.1452 16.1289 56.3596 15.2948C57.7071 14.367 59.7169 13.8952 60.6011 15.1234C61.0787 15.3072 62.0055 15.7666 62.8364 15.8338C67.8963 15.8903 65.3166 11.2144 64.1662 8.66617C63.5181 7.233 62.8346 5.84931 62.2185 4.48683C61.622 3.16676 60.8053 1.77777 60.3064 0.440033L60.2496 0.348141C60.0276 -0.390533 57.3343 0.266851 56.5727 0.367579C55.1825 0.551364 53.7373 0.766958 52.4039 1.1416C49.7941 1.87497 47.8375 2.60481 48.5353 5.65493L48.5406 5.65316Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.9434 44.6102L29.8027 46.1335L32.1871 50.069L33.3518 49.6342C34.884 48.6976 38.3052 47.2645 40.1836 46.4781C42.1899 45.6369 45.9449 43.5163 47.6511 45.2623C48.4713 46.2819 48.3204 47.4005 47.9795 48.5775C47.47 50.5002 45.8189 52.7922 47.3617 55.2591C48.3737 56.8778 50.7421 57.8763 53.0342 58.0017C55.3209 57.6412 56.0382 57.6395 58.0942 56.6781C59.3654 56.0826 60.8319 54.9711 61.5971 54.0557C63.669 51.5817 63.7223 48.7683 61.5509 45.6281C60.8461 45.0361 60.4004 44.976 59.1949 44.9301C57.2686 44.8346 55.9423 42.8713 57.0342 41.2526C57.7071 40.2559 60.3667 39.4536 61.7995 38.9959L70.3606 36.6562C71.6531 36.3169 72.3864 36.4583 72.9563 35.7709C72.5195 34.4879 72.713 34.7335 71.0068 35.0004L57.4124 37.0167C56.2317 37.1987 52.5548 38.0134 52.2565 37.4461L51.447 33.7598L49.6165 34.0143C49.5916 34.7936 49.7212 35.4422 49.6627 36.2073L49.4869 38.1707L31.3775 40.8479C29.8258 40.6942 31.2053 36.8771 29.4139 36.9867C29.0925 37.6511 29.4849 38.9677 29.6127 39.83L29.421 39.8583C29.1689 38.1601 29.3376 36.9248 28.5067 37.1033C27.848 37.2447 28.4445 39.3741 28.6327 40.5864L30.0708 40.6359C30.0957 40.5775 30.2004 40.6624 30.259 40.6924C30.2111 40.7401 30.1418 40.7861 30.0974 40.8126L27.571 41.4134C27.6846 42.5797 28.4978 43.504 28.9434 44.6137V44.6102Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M54.1687 33.4736C53.6947 33.8023 53.3662 33.9419 53.8935 35.8487C54.1226 36.6775 54.7883 37.1457 55.5944 36.5891C56.388 36.0413 55.9193 32.2613 54.1687 33.4736Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M36.2653 39.4925C37.3607 39.238 36.75 39.5049 36.8938 38.9871C36.9115 38.9217 36.8991 38.6743 36.9044 38.6036L36.9311 38.2361C36.9346 38.1954 36.94 38.1194 36.9577 38.0629C37.1175 39.3423 36.7997 39.3123 37.8525 39.2787C38.0585 38.8369 37.8809 37.204 37.6892 36.5696C37.3163 35.3326 37.8277 36.1579 37.1068 35.8292C36.3523 36.4936 36.9027 36.3487 36.7322 37.2995C36.3487 36.0554 36.6772 36.2851 35.9741 35.9882C35.5746 36.3487 35.5107 36.0041 35.7859 37.8013C35.9031 38.563 35.8392 39.0437 36.2653 39.4907V39.4925Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M58.1688 35.854C59.3068 36.6881 59.843 35.6843 59.8838 35.3256C60.017 34.1239 59.6051 34.4667 59.5713 34.4226C58.554 34.8661 59.3405 34.4031 59.0671 34.8785L58.8789 35.3733C58.8647 35.4104 58.8416 35.4899 58.8097 35.5394L58.8825 33.827L59.7027 34.0037C59.4737 30.9695 56.2264 33.4842 58.1688 35.8522V35.854Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M68.6704 34.6929C69.2332 34.6364 68.9367 34.8272 69.3397 34.4968C69.8741 34.0585 68.9545 34.9987 69.5262 34.26C69.5492 34.2299 69.5883 34.1469 69.6061 34.1204C69.6238 34.0939 69.6504 34.0196 69.6824 33.9737C70.2168 34.412 69.5368 34.1663 70.1564 34.3819C70.6802 34.5639 70.2328 34.5074 70.8098 34.3519L69.8138 31.1091L68.6775 31.1887L68.6704 34.6912V34.6929Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M43.9635 38.3669C44.7323 38.0081 44.4465 38.2697 44.3097 37.0044L45.1886 36.4742L44.8708 34.882L43.1397 34.9456C43.1557 35.8151 43.1824 38.1407 43.9635 38.3669Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M62.6517 33.8906C61.5794 32.1941 62.744 32.6854 61.5563 32.2348C61.4391 32.5971 61.1959 31.9591 61.5385 33.2191C61.5723 33.3428 61.8279 33.9366 61.8972 34.1221C62.4209 35.5305 62.0499 34.8396 61.9433 35.6896C62.982 35.5871 63.3051 35.4793 63.3033 34.442C63.3033 33.6768 63.3335 32.4628 62.9163 32.0404C62.2913 32.4292 62.5789 33.0353 62.6517 33.8889V33.8906Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.6967 39.9856C33.4903 39.9502 33.6306 40.0174 34.1756 39.6498C33.6998 38.7203 32.8547 39.6834 33.8667 38.0841C33.1654 37.5487 33.6412 38.1248 33.2258 37.4886C33.398 36.711 33.6945 37.0927 33.5826 36.3947L32.2333 36.5838L32.6949 39.9856H32.6967Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.4238 35.6525C39.9511 36.9231 39.8197 34.8095 40.4198 38.8298L41.1992 38.7856C41.185 38.0699 41.0767 37.6882 40.9861 37.0185L41.0057 36.0448C41.0199 35.9935 41.0572 35.937 41.0731 35.8875C41.114 35.7638 41.1956 35.7249 41.2471 35.3821C40.6044 35.2619 39.9724 35.3326 39.4238 35.6507V35.6525Z"
                  fill={data.logo.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M65.4942 35.1577L66.3428 35.0852L66.0126 32.4186C66.7636 31.7488 66.4192 32.5317 66.4902 31.6569L65.0503 31.7223L65.4942 35.1559V35.1577Z"
                  fill={data.logo.color}
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="100" height="58" fill={data.logo.color} />
                </clipPath>
              </defs>
            </svg>
          </div>

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
              color: data.title.color,
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
              autoFocus
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
