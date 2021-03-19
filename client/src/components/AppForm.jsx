import React from 'react';

const AppForm = ({ id, baseUrl, initialState, mode, withoutDelete , onAddPage}) => {
  const [form, setForm] = React.useState(initialState);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm(initialState);
      setEditMode(false);
    }
  };

  const handleUpdate = () => {
    if (window.confirm('Уверены что хотите обновить?')) {
      console.log('updating');

      const updateData = async () => {
        try {
          const res = await fetch(`${baseUrl}/${id}.json`, {
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

  const handleDelete = () => {
    if (window.confirm('Уверены что хотите удалить?')) {
      const deleteData = async () => {
        try {
          const res = await fetch(`${baseUrl}/${id}.json`, {
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
          
          
          onAddPage(form.pagePath, form.pageName);
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

  const fieldsName = Object.keys(initialState).filter((item) => item !== 'id');

  return (
    <div style={{ borderBottom: '1px solid grey' }}>
      {fieldsName.map((field) => (
        <div className="admin-item__field" key={field}>
          <label>
            {field}

            {mode === 'edit' ? (
              <input
                name={field}
                disabled={!editMode}
                type="text"
                value={form[field]}
                onChange={handleChange}
              />
            ) : (
              <input name={field} type="text" value={form[field]} onChange={handleChange} />
            )}
          </label>
        </div>
      ))}

      <div>
        {isSuccesfullSent && (
          <p style={{ backgroundColor: 'green', padding: '10px' }}>Успешно отправлено</p>
        )}

        {mode === 'new' ? (
          <div>
            <button style={{ backgroundColor: 'lightgreen' }} onClick={handleUpload}>
              Сохранить изменения
            </button>
            <button onClick={handleCancel}>Отменить</button>
          </div>
        ) : (
          <div>
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

                {!withoutDelete && (
                  <button style={{ backgroundColor: 'tomato' }} onClick={handleDelete}>
                    Удалить
                  </button>
                )}

                <button onClick={() => setEditMode(false)} onClick={handleCancel}>
                  Отменить
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppForm;
