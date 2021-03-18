import React from 'react';
import Form from '../components/AppForm';
import AdminAddButton from '../components/admin-add-button';
import { adapterPage1 as adapter } from '../utils';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';

const AdminPage1 = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/page1.json`);
        const resData = await response.json();

        const adaptedData = adapter(resData);

        setData(adaptedData);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  const { title, afisha, projects, studios, teachers } = data;

  const sections = [{
    title: 'Открыты студии',
    newItemUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/studios.json',
    baseUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/studios',
    initialState: {
      title: '',
      description: ''
    },
    items: studios
  },
  {
    title: 'Планируются к открытию',
    newItemUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/projects.json',
    baseUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/projects',
    initialState: {
      title: '',
      description: ''
    },
    items: projects
  },
  {
    title: 'Преподаватели',
    newItemUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/teachers.json',
    baseUrl: 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/page1/teachers',
    initialState: {
      name: '',
      subj: ''
    },
    items: teachers
  }
]

  return (
    <>
      <div className="admin-item">

        {sections.map((section, i)=>
          <div key={i}>
          <h3>{section.title}</h3>
          <AdminAddButton>
            <div className="admin-item__form">
              <Form
                mode="new"
                baseUrl={
                  section.newItemUrl
                }
                initialState={section.initialState}
              />
            </div>
          </AdminAddButton>

          <div>
            {section.items.map((item, i) => (
              <div className="admin-item__form" key={i}>
                <Form
                  mode="edit"
                  baseUrl={section.baseUrl}
                  initialState={item}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>
        )}

      </div>
    </>
  );
};

export default AdminPage1;
