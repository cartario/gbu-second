import React from 'react';
import Form from '../AppForm';
import AdminAddButton from './admin-add-button';
import { adapterCreatePage as adapter } from '../../utils';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';

const AdminCreatePage = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pages.json`);

        const resData = await response.json();

        const adaptedData = adapter(resData);

        setData(adaptedData);
      } catch (err) {
        setData({})
        console.log(err);        
      }
    };

    fetchData();
  }, []);

  const addPage = async (path, pageName) => {
    await fetch(`${BASE_URL}/${path}/info.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageName
      }),
    })

    await fetch(`${BASE_URL}/${path}/items.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: '',
        imgUrl: '',
        videoUrl: '',
        title: ''
      }),
    })
  }

  if (!data) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <div className="admin-item">
        <div>
          <h3>Страницы</h3>
          <AdminAddButton>
            <div className="admin-item__form">
              <Form 
              onAddPage={addPage}
              mode="new" baseUrl={`${BASE_URL}/pages.json`} initialState={{
                pageName: '',
                pagePath: '',
                visible: true
              }} />
            </div>
          </AdminAddButton>

          <div>
            {data.items&&data.items.map((item, i) => (
              <div className="admin-item__form" key={i}>
                <Form mode="edit" baseUrl={`${BASE_URL}/pages`} initialState={item} id={item.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreatePage;
