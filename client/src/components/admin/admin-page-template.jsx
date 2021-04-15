import React from 'react';
import Form from '../AppForm';
import AdminAddButton from './admin-add-button';
import { adapterPage2 as adapter } from '../../utils';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';

const AdminPageTemplate = ({path}) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${path}.json`);

        const resData = await response.json();

        const adaptedData = adapter(resData);

        setData(adaptedData);
      } catch (err) {
        console.log(err);
        
      }
    };

    fetchData();
  }, [path]);

  if (!data) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }  

  const {  items } = data;

  return (
    <>
      <div className="admin-item">
        <div>
          <h3>Блоки</h3>
          <AdminAddButton>
            <div className="admin-item__form">
              <Form mode="new" baseUrl={`${BASE_URL}/${path}/items.json`} initialState={{
                title: '',
                description: '',
                imgUrl: '',
                videoUrl: ''
              }} />
            </div>
          </AdminAddButton>

          <div>
            {items.map((item, i) => (
              <div className="admin-item__form" key={i}>
                <Form mode="edit" baseUrl={`${BASE_URL}/${path}/items`} initialState={item} id={item.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPageTemplate;
