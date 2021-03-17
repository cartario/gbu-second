import React from 'react';

const Form = ({ data }) => {
  const [form, setForm] = React.useState(data);
  const [editMode, setEditMode] = React.useState(false);
  const [isSuccesfullSent, setSuccesfullSent] = React.useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    if (window.confirm('Выйти без изменений?')) {
      setForm(data);
      setEditMode(false);
    }
  };

  const handleUpdate = () => {
    if (window.confirm('Уверены что хотите обновить?')) {
      console.log('updating');

      const updateData = async () => {
        try {
          const res = await fetch(`https://centerdaniil-b74b6-default-rtdb.firebaseio.com/mainPage/totalCount/-MVyiJLub00dIoC5KR0X.json`, {
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
    <>
      {Object.keys(data).filter((each)=>each!=='id').map((field) => (
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
    </>
  );
};

const AdminSummPage = () => {
  const [data, setData] = React.useState();
  const [studios, setStudios] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/mainPage/totalCount/-MVyiJLub00dIoC5KR0X.json',
      );
      const resData = await response.json();
      setData(resData);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        '/api/studios',
      );
      const resData = await response.json();
      setStudios(resData);
    };

    fetchData();
  }, []);

  if (!data || !studios) {
    return (
      <>
        <div className="admin-item">
          <h3>Суммарные показатели</h3>
          <p>Loading...</p>
        </div>
      </>
    );
  }





  const budgetSportStudios = studios.filter(
    (studio) => !studio.isDuplicate && studio.price==='free' &&studio.type === 'sport',
  ).length;

  const budgetArtStudios = studios.filter(
    (studio) => !studio.isDuplicate && studio.price==='free' &&studio.type !== 'sport',
  ).length;

  const platkaSportStudios = studios.filter(
    (studio) => !studio.isDuplicate && studio.price!=='free' &&studio.type === 'sport',
  ).length;

  const platkaArtStudios = studios.filter(
    (studio) => !studio.isDuplicate && studio.price!=='free' &&studio.type !== 'sport',
  ).length;

  const instructorsCount = [...new Set(studios.map((studio) => !studio.isDuplicate&&studio.teacher))].length;

  return (
    <>
      <div className="admin-item">
        <h3>Суммарные показатели</h3>

        <Form data={data} />
        <h3>Фактические показатели</h3>
        <p>Бюджет: досуг({budgetArtStudios}) спорт({budgetSportStudios}) </p>
        <p>Платка: досуг({platkaArtStudios}) спорт({platkaSportStudios}) </p>
        <p>Тренеров/преподавателей: ({instructorsCount}) </p>

      </div>
    </>
  );
};

export default AdminSummPage;
