import React from 'react';
import useHttp from '../hooks/http.hook';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';

const AdminStudioNewCard = ({ handleShowNewStudio }) => {
  const {request} = useHttp();

  const [form, setForm] = React.useState({
    name: '',
    title: '',
    groupNumber: '',
    adress: '',
    age_min: '',
    day: '',
    timeFrom: '',
    timeTo: '',    
    price: '',    
    type: '',
    isDuplicate: '',
    age_max: '',
    cab: '',
    teacher: '',
    priceOptions: '',
    imgUrl: '',
    description: '',
    status: '',
  });

  const [studio, setStudio] = React.useState(null);

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
    const response = await request('/api/studios/create', 'POST', form);
    setStudio(response);
   }catch(err){}
  }

  return (
    <div className="admin-studio_item">
      <p>New studio</p>
      <span
        onClick={() => {
          // handleShowNewStudio(false);
        }}
      >
        {' '}
        hide
      </span>
      <form>
      <div>
        <label>
          *Название группы студий/секций
          <input name="name" type="text" value={form.name} onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
        *Название студии/секции
          <input name="title" type="text" value={form.title} onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Номер группы студии/секции:
          <input name="groupNumber" type="text" value={form.groupNumber} onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Место проведения занятий:
          <input name="adress" type="text" value={form.adress} onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Минимальный возраст:
          <input
            name="age_min"
            type="text"
            value={form.age_min}
            onChange={handleClickForm}
            required
          />
        </label>
      </div>

      <div>
        <label>
          *День недели:
          <input 
          name="day" 
          type="text" 
          value={form.day} 
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Стоимость:
          <input 
          name="price" 
          type="text" 
          value={form.price} 
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Время начала занятий:
          <input 
          name="timeFrom" 
          type="text" 
          value={form.timeFrom} 
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Время окончания занятий:
          <input 
          name="timeTo" 
          type="text" 
          value={form.timeTo} 
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Категория:
          <input 
          name="type" 
          type="text" 
          value={form.type} 
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
        isDuplicate:
          <input 
          name="isDuplicate" 
          type="text" 
          value={form.isDuplicate} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        age_max:
          <input 
          name="age_max" 
          type="text" 
          value={form.age_max} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        cab:
          <input 
          name="cab" 
          type="text" 
          value={form.cab} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        teacher:
          <input 
          name="teacher" 
          type="text" 
          value={form.teacher} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        priceOptions:
          <input 
          name="priceOptions" 
          type="text" 
          value={form.priceOptions} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        imgUrl:
          <input 
          name="imgUrl" 
          type="text" 
          value={form.imgUrl} 
          onChange={handleClickForm}          
          />
        </label>
      </div>

      <div>
        <label>
        description:
          <input 
          name="description" 
          type="text" 
          value={form.description} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        status:
          <input 
          name="status" 
          type="text" 
          value={form.status} 
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        
        <button
          onClick={() => {
            // handleShowNewEvent(false);
            handleSubmit();
          }}
        >
          Submit
        </button>
        
      </div>
      </form>
    </div>
  );
};

const AdminEventNewCard = ({ handleShowNewEvent }) => {
  const {request} = useHttp();

  const [form, setForm] = React.useState({
    title: '',
    date: '',
    category: '',
    place: '',
    description: '',
    posterUrl: '',
  });

  const [event, setEvent] = React.useState(null);

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
    const response = await request('/api/events/create', 'POST', form);
    setEvent(response);
   }catch(err){}
  }

  return (
    <div className="admin-event_item">
      <p>New event</p>
      <span
        onClick={() => {
          handleShowNewEvent(false);
        }}
      >
        {' '}
        hide
      </span>
      <div>
        <label>
          Title:
          <input name="title" type="text" value={form.title} onChange={handleClickForm} />
        </label>
      </div>

      <div>
        <label>
          Date:
          <input name="date" type="datetime-local" value={form.date} onChange={handleClickForm} />
        </label>
      </div>

      <div>
        <label>
          Category:
          <input name="category" type="text" value={form.category} onChange={handleClickForm} />
        </label>
      </div>

      <div>
        <label>
          Place:
          <input name="place" type="text" value={form.place} onChange={handleClickForm} />
        </label>
      </div>

      <div>
        <label>
          Description:
          <input
            name="description"
            type="text"
            value={form.description}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          PosterImage:
          <input name="posterUrl" type="text" value={form.posterUrl} onChange={handleClickForm} />
        </label>
      </div>

      <div>
        
        <button
          onClick={() => {
            // handleShowNewEvent(false);
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const AdminEventCard = ({ event }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(event);
  const {request} = useHttp();
  
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
    handleUpdateEvent(form)
  };

  const handleDeleteEvent = (id) => {
    request(`api/events/${id}`, 'DELETE');
  };

  const handleUpdateEvent = (form) => {
    if(editMode){
      request(`api/events/${form._id}`, 'PATCH', form);
    };    
  }; 

  return (
    <li className="admin-event_item">
      <p>id: {event._id}</p>
      <div>
        <label>
          Title:
          <input
            name="title"
            disabled={!editMode}
            type="text"
            value={form.title}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          Date:{form.date.toLocaleString()}
          <input
            name="date"
            disabled={!editMode}
            type="datetime-local"
            value={form.date.toLocaleString()}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          Category:
          <input
            name="category"
            disabled={!editMode}
            type="text"
            value={form.category}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          Place:
          <input
            name="place"
            disabled={!editMode}
            type="text"
            value={form.place}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          Description:
          <textarea
          rows={10}
          cols={30}
            name="description"
            disabled={!editMode}
            
            value={form.description}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <label>
          PosterImage:
          <input
            name="posterUrl"
            disabled={!editMode}
            type="text"
            value={form.posterUrl}
            onChange={handleClickForm}
          />
        </label>
      </div>

      <div>
        <img style={{width: '100px'}} src={event.posterUrl} alt="eventPoster"/>
      </div>

      <div>
        <button onClick={()=>{handleDeleteEvent(event._id)}}>Delete</button>
        <button onClick={handleEditMode}>{editMode ? 'Save' : 'Edit'}</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    </li>
  );
};

const AdminStudioCard = ({ studio }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(studio);
  const {request} = useHttp();
  
  const handleClickForm = (e) => {
    const target = e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: target,
    });
  };

  const handleEditMode = (e) => {   
    e.preventDefault(); 
    setEditMode(!editMode);
    handleUpdateStudio(form)
  };

  const handleDeleteStudio = (id) => {
    request(`api/studios/${id}`, 'DELETE');
  };

  const handleUpdateStudio = (form) => {
    if(editMode){
      request(`api/studios/${form._id}`, 'PATCH', form);
    };    
  }; 

  return (
    <li className="admin-studio_item">
      <p>id: {studio._id}</p>

      <form>
      <div>
        <label>
          *Название группы студий/секций
          <input name="name" type="text" value={form.name} onChange={handleClickForm} 
          disabled={!editMode}
          required/>
        </label>
      </div>

      <div>
        <label>
        *Название студии/секции
          <input name="title" type="text" value={form.title} onChange={handleClickForm} disabled={!editMode} required/>
        </label>
      </div>

      <div>
        <label>
          *Номер группы студии/секции:
          <input name="groupNumber" type="text" value={form.groupNumber} onChange={handleClickForm} disabled={!editMode} required/>
        </label>
      </div>

      <div>
        <label>
          *Место проведения занятий:
          <input name="adress" type="text" value={form.adress} onChange={handleClickForm} disabled={!editMode} required/>
        </label>
      </div>

      <div>
        <label>
          *Минимальный возраст:
          <input
            name="age_min"
            type="text"
            value={form.age_min}
            onChange={handleClickForm}
            disabled={!editMode}
            required
          />
        </label>
      </div>

      <div>
        <label>
          *День недели:
          <input 
          name="day" 
          type="text" 
          value={form.day} 
          disabled={!editMode}
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Стоимость:
          <input 
          name="price" 
          type="text" 
          value={form.price} 
          disabled={!editMode}
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Время начала занятий:
          <input 
          name="timeFrom" 
          type="text" 
          value={form.timeFrom} 
          disabled={!editMode}
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Время окончания занятий:
          <input 
          name="timeTo" 
          type="text" 
          value={form.timeTo} 
          disabled={!editMode}
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
          *Категория:
          <input 
          name="type" 
          type="text" 
          value={form.type} 
          disabled={!editMode}
          onChange={handleClickForm} required/>
        </label>
      </div>

      <div>
        <label>
        isDuplicate:
          <input 
          name="isDuplicate" 
          type="text" 
          value={form.isDuplicate} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        age_max:
          <input 
          name="age_max" 
          type="text" 
          value={form.age_max} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        cab:
          <input 
          name="cab" 
          type="text" 
          value={form.cab} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        teacher:
          <input 
          name="teacher" 
          type="text" 
          value={form.teacher} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        priceOptions:
          <input 
          name="priceOptions" 
          type="text" 
          value={form.priceOptions} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        imgUrl:
          <input 
          name="imgUrl" 
          type="text" 
          value={form.imgUrl} 
          onChange={handleClickForm}
          disabled={!editMode}
          required
          />
        </label>
      </div>

      <div>
        <label>
        description:
          <input 
          name="description" 
          type="text" 
          value={form.description} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <label>
        status:
          <input 
          name="status" 
          type="text" 
          value={form.status} 
          disabled={!editMode}
          onChange={handleClickForm}/>
        </label>
      </div>

      <div>
        <img style={{width: '100px'}} src={studio.imgUrl || "https://bayramix.ru/local/templates/bayramix_new/images/load.gif"} alt="studioPoster"/>
      </div>

        <button onClick={handleEditMode}>{editMode ? 'Save' : 'Edit'}</button>

      </form>

      <div>
        <button onClick={()=>{handleDeleteStudio(studio._id)}}>Delete</button>
        
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>

      

      
    </li>
  );
};

const AdminPage = ({events, studios}) => {
  const { request, loading, error, clearError } = useHttp();
  
  const auth = useContext(AuthConext);
  const [showNewEvent, setshowNewEvent] = React.useState(false);
  const [showNewStudio, setshowNewStudio] = React.useState(false);

  const handleShowNewEvent = (value) => {
    setshowNewEvent(value);
  };

  const handleShowNewStudio = (value) => {
    setshowNewStudio(value);
  };

  

  return (
    <>
      <h1>AdminPage</h1>
      <nav>
        <ul>
          <li>
            <a href="/">На главную</a>
          </li>
          <li>
            {' '}
            <a href="/login" onClick={() => auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <h2>Events</h2>

        {showNewEvent ? (
          <AdminEventNewCard handleShowNewEvent={handleShowNewEvent} />
        ) : (
          <button onClick={() => handleShowNewEvent(true)}>+</button>
        )}
        <ul>{events&&events.map((event) => <AdminEventCard key={event._id} event={event} />)}</ul>
      </div>

      <div>
        <h2>Studios</h2>

        {showNewStudio ? (
          <AdminStudioNewCard handleShowNewStudio={handleShowNewStudio} />
        ) : (
          <button onClick={() => handleShowNewStudio(true)}>+</button>
        )}
        <ul>{studios&&studios.map((studio) => <AdminStudioCard key={studio._id} studio={studio} />)}</ul>
      </div>      
    </>
  );
};

export default AdminPage;
