import React from 'react';
import useHttp from '../hooks/http.hook';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';

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
    const event = await request('/api/events/create', 'POST', form);
    setEvent(event);
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
          Date:{form.date}
          <input
            name="date"
            disabled={!editMode}
            type="datetime-local"
            value={new Date(form.date)}
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

const AdminPage = () => {
  const { request, loading, error, clearError } = useHttp();
  const [events, setEvents] = React.useState(null);
  const auth = useContext(AuthConext);
  const [showNewEvent, setshowNewEvent] = React.useState(false);

  

  const handleShowNewEvent = (value) => {
    setshowNewEvent(value);
  };

  React.useEffect(() => {
    async function fetchEvents() {
      const response = await request('api/events'); 
      (response.forEach((event)=>new Date(event.date)))     
      setEvents(response);
    }
    fetchEvents();
  }, [request]);

  if(!events){
    return null;
  }

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
        <ul>{events && events.map((event) => <AdminEventCard key={event._id} event={event} />)}</ul>
      </div>

      <div>
        <h2>Studios</h2>
        <ul>
          <li>stufio1</li>
        </ul>
      </div>

      {/* {loading ? <p>Loading...</p> : JSON.stringify(events)}   */}
    </>
  );
};

export default AdminPage;
