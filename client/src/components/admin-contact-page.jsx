import React from 'react';
import AdminAddButton from '../components/admin-add-button';
import { adapterContactPage as adapter } from '../utils';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/';

const NewItem = () => {
  return (
    <AdminAddButton>
      <div className="admin-item__form">
        <Form
          mode="new"
          baseUrl={
            'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/contactPage/items/members.json'
          }
          initialState={{
            name: '',
            position: '',
            description: '',
            imgUrl: '',
          }}
        />
      </div>
    </AdminAddButton>
  );
};

const Form = ({ baseUrl, initialState, mode }) => {
  const [form, setForm] = React.useState(initialState);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm(initialState);
    }
  };

  const handleUpload = () => {
    if (window.confirm('Уверены что хотите сохранить?')) {
      const uploadData = async () => {
        try {
          const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });

          if (res) {
            setSuccesfullSent(true);
            setForm(initialState);
          }
        } catch (err) {
          throw err;
        }
      };

      uploadData();
    }
  };

  React.useEffect(() => {
    let timer;

    if (isSuccesfullSent) {
      timer = setTimeout(() => {
        setSuccesfullSent(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccesfullSent]);

  return (
    <div style={{ borderBottom: '1px solid grey' }}>
      <div className="admin-item__field">
        <label>
          ФИО:
          <input name="name" type="text" value={form.name} onChange={handleChange} />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Должность:
          <input name="position" type="text" value={form.position} onChange={handleChange} />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Фото:
          <input name="imgUrl" type="text" value={form.imgUrl} onChange={handleChange} />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Описание:
          <textarea
            rows={6}
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <div>
        {isSuccesfullSent && (
          <p style={{ backgroundColor: 'green', padding: '10px' }}>Успешно отправлено</p>
        )}
        <button style={{ backgroundColor: 'lightgreen' }} onClick={handleUpload}>
          Сохранить изменения
        </button>

        <button onClick={handleCancel}>Отменить</button>
      </div>
    </div>
  );
};

const Item = ({ item }) => {
  const [form, setForm] = React.useState(item);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);

  const [editMode, setEditMode] = React.useState(false);

  const BASE_URL_MEMBER = `${BASE_URL}/contactPage/items/members/${item.id}.json`;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm({ ...item });
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Уверены что хотите удалить?')) {
      const deleteData = async () => {
        try {
          const res = await fetch(BASE_URL_MEMBER, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (res) {
            setSuccesfullSent(true);
            window.location.reload();
          }
        } catch (err) {
          throw err;
        }
      };

      deleteData();
    }
  };

  const handleUpdate = () => {
    if (window.confirm('Уверены что хотите обновить?')) {
      console.log('updating');

      const updateData = async () => {
        try {
          const res = await fetch(BASE_URL_MEMBER, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });

          if (res) {
            setSuccesfullSent(true);
            window.location.reload();
          }
        } catch (err) {
          throw err;
        }
      };

      updateData();
      setEditMode(false);
    }
  };

  React.useEffect(() => {
    let timer;

    if (isSuccesfullSent) {
      timer = setTimeout(() => {
        setSuccesfullSent(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccesfullSent]);

  return (
    <div style={{ borderBottom: '1px solid grey' }}>
      <div className="admin-item__field">
        <label>
          ФИО:
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Должность:
          <input
            disabled={!editMode}
            name="position"
            type="text"
            value={form.position}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Фото:
          <input
            disabled={!editMode}
            name="imgUrl"
            type="text"
            value={form.imgUrl}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="admin-item__field">
        <label>
          Описание:
          <textarea
            disabled={!editMode}
            rows={6}
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <div>
        {isSuccesfullSent && (
          <p style={{ backgroundColor: 'green', padding: '10px' }}>Успешно отправлено</p>
        )}
        {!editMode && (
          <button style={{ marginBottom: '20px' }} onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
        {editMode && (
          <>
            <button style={{ backgroundColor: 'lightgreen' }} onClick={handleUpdate}>
              Сохранить изменения
            </button>
            <button style={{ backgroundColor: 'tomato' }} onClick={handleDelete}>
              Удалить
            </button>
            <button onClick={() => setEditMode(false)} onClick={handleCancel}>
              Отменить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const AdminContactPage = () => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contactPage.json`);
        const data = await response.json();

        const adaptedData = adapter(data);

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

  const { members, contacts, social } = data.items;

  return (
    <>
      <div className="admin-item">
        <h3>Сотрудники</h3>
        <NewItem />

        <div>
          {members.map((member) => (
            <Item key={member.name} item={member} />
          ))}
        </div>
      </div>

      <AdminContactPageContacts contacts={contacts} />

      <div className="admin-item">
        <h3>Соцсети</h3>
        <AdminContactPageSocial social={social} />
      </div>
    </>
  );
};

export default AdminContactPage;

const AdminContactPageContacts = ({ contacts }) => {
  const [form, setForm] = React.useState(contacts);
  const [editMode, setEditMode] = React.useState(false);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm(contacts);
      setEditMode(false);
    }
  };

  const handleUpdate = () => {
    if (window.confirm('Уверены что хотите обновить?')) {
      console.log('updating');

      const updateData = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/contactPage/items/contacts/-MVuLfDAd0FHzKYKLeq_.json`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
            },
          );

          if (res) {
            setSuccesfullSent(true);
            setEditMode(false);
          }
        } catch (err) {
          throw err;
        }
      };

      updateData();
    }
  };

  React.useEffect(() => {
    let timer;

    if (isSuccesfullSent) {
      timer = setTimeout(() => {
        setSuccesfullSent(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccesfullSent]);

  return (
    <div className="admin-item">
      <h3>Контакты</h3>

      {Object.keys(contacts).map((field) => (
        <div key={field} className="admin-item__field">
          <label>
            {field}
            <input
              disabled={!editMode}
              name={field}
              type="text"
              value={form[field]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}

      <div>
        {isSuccesfullSent && (
          <p style={{ backgroundColor: 'green', padding: '10px' }}>Успешно отправлено</p>
        )}
        {!editMode && (
          <button style={{ marginBottom: '20px' }} onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
        {editMode && (
          <>
            <button style={{ backgroundColor: 'lightgreen' }} onClick={handleUpdate}>
              Сохранить изменения
            </button>

            <button onClick={() => setEditMode(false)} onClick={handleCancel}>
              Отменить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const AdminContactPageSocial = ({ social }) => {
  return (
    <ul>
      {social.map((item)=><AdminContactPageSocialItem key={item.id} socialItem={item}/>)}
    </ul>
  );
};

const AdminContactPageSocialItem = ({ socialItem }) => {
  const [form, setForm] = React.useState(socialItem);
  const [editMode, setEditMode] = React.useState(false);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm(socialItem);
      setEditMode(false);
    }
  };

  const handleUpdate = () => {
    if (window.confirm('Уверены что хотите обновить?')) {
      console.log('updating');

      const updateData = async () => {
        try {
          const res = await fetch(`${BASE_URL}/contactPage/items/social/${socialItem.id}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });

          if(res){
            setSuccesfullSent(true);
            setEditMode(false);
            window.location.reload();
          }
        } catch (err) {
          throw err;
        }
      };

      updateData();
    }
  };

  React.useEffect(()=>{
    let timer;

    if(isSuccesfullSent){
      timer = setTimeout(()=>{
        setSuccesfullSent(null);
      }, 3000)
    }

    return ()=>{
      clearTimeout(timer);

    }
  },[isSuccesfullSent])

  return (
    <div>    

      {Object.keys(socialItem).filter((each)=>each!=='id').map((field) => (
        <div key={field} className="admin-item__field">
          <label>
            {field}
            <input
              disabled={!editMode}
              name={field}
              type="text"
              value={form[field]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}

      <div>
      {isSuccesfullSent && <p style={{backgroundColor: 'green', padding: '10px'}}>Успешно отправлено</p>}
        {!editMode && (
          <button style={{ marginBottom: '20px' }} onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
        {editMode && (
          <>

            <button style={{ backgroundColor: 'lightgreen' }} onClick={handleUpdate}>
              Сохранить изменения
            </button>

            <button onClick={() => setEditMode(false)} onClick={handleCancel}>
              Отменить
            </button>
          </>
        )}
      </div>
    </div>
  );
};
