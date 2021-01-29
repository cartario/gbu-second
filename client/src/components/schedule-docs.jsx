import React from 'react';
import useHttp from '../hooks/http.hook';


const AdminDocCard = ({ doc }) => {
  const { title } = doc;
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(doc);
  const { request, loading, error, clearError } = useHttp();

  const handleClickForm = (e) => {
    const target = e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: target,
    });
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
    handleUpdateEvent(form);    
  };

  const handleDeleteEvent = (id) => {
    request(`api/docs/${id}`, 'DELETE');
    window.location.reload(); //temporary
  };

  const handleUpdateEvent = (form) => {
    if (editMode) {
      request(`api/docs/${form._id}`, 'PATCH', form);
      window.location.reload(); //temporary      
    }
  };

  const handleToggleForm = () => {
    setVisible(!visible);
  };

  return (
    <li className="admin-item">
      <div className="admin-item__top">
        <p className="admin-item__title" onClick={handleToggleForm}>
          <span>{title}</span>
        </p>

       {visible&& <form onSubmit={(e) => e.preventDefault()} className="admin-item__form">
          <div className="admin-item__field">
            <label>
              Title
              <input 
                name="title"
                disabled={!editMode}
                type="text"
                value={form.title}
                onChange={handleClickForm}              
              />
            </label>
          </div>
          <div className="admin-item__field">
            <label>
              Url
              <input 
                name="url"
                disabled={!editMode}
                type="text"
                value={form.url}
                onChange={handleClickForm}                
              />
            </label>
          </div>

          <div className="admin-item__controls">
            <button className="admin-item__controls--edit" onClick={handleEditMode}>
              {editMode ? 'Save' : 'Edit'}
            </button>
            {editMode ? (
              <>
                <button className="admin-item__controls--cancel" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
                <button
                  className="admin-item__controls--delete"
                  onClick={() => {
                    handleDeleteEvent(doc._id);
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </form>}
      </div>
    </li>
  );
};

// const docs = [
//   {
//     _id: Date.now().toString(),
//     title: 'test title',
//     url: 'test url',
//   },
// ];

const ScheduleDocs = () => {
  const { request, loading, error, clearError } = useHttp();
  const [visible, setVisible] = React.useState(false);
  const [docs, setDocs] = React.useState(null);

  const [form, setForm] = React.useState({
    title: '',
    url: ''    
  });

  const getDocs = React.useCallback(async ()=>{
    try {
      const response = await request(`/api/docs`);
      setDocs(response)
    }
    catch(err){}
  },[request]);

  React.useEffect(()=>{    
    getDocs();
    
  }, [getDocs]);

  const handleClickForm = (e) => {
    const target = e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: target,
    });
  };

  const handleSubmit = async ()=>{    
    try{
     const response = await request('/api/docs/create', 'POST', form);
    //  setEvent(response);
     window.location.reload(); //temporary
    }catch(err){}
   }

   if(!docs){
    return (<h1>Loading...</h1>)
  }

  return (
    <div className="schedule-docs ">
      <h2>Расписания</h2>

      {!visible && <button onClick={() => setVisible(true)}>+</button>}
      {visible && (
        <div className="admin-item admin-item--new">
          <p onClick={() => setVisible(false)} className="admin-item__title">
            Новое расписание
          </p>
          <form className="admin-item__form" onSubmit={(e)=>e.preventDefault()}>
            <div className="admin-item__field">
              <label>
                Title
                <input type="text" name="title" 
                value={form.title} onChange={handleClickForm} required
                />
              </label>
            </div>
            <div className="admin-item__field">
              <label>
                Url
                <input type="text" name="url" 
                value={form.url} onChange={handleClickForm} required
                />
              </label>
            </div>
            <button  onClick={() => {            
            handleSubmit();
          }}>Submit</button>
          </form>
        </div>
      )}
      <ul>
        {docs ? docs.map((doc) => <AdminDocCard key={doc._id} doc={doc} />) : <p>Loading...</p>}
      </ul>
    </div>
  );
};

export default ScheduleDocs;
