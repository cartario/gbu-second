import React from 'react';
import useHttp from '../hooks/http.hook';

const AdminEventCard = ({ event , setEvents}) => {
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(event);
  const { request } = useHttp();

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
    request(`api/events/${id}`, 'DELETE');
  };

  const handleUpdateEvent = (form) => {
    if (editMode) {
      request(`api/events/${form._id}`, 'PATCH', form);
    }
  };

  const handleToggleForm = () => {
    setVisible(!visible);
  };

  return (
    <li className="admin-item">
      <div className="admin-item__top">
        <p className="admin-item__title" onClick={handleToggleForm}>
          <span>{event.title}</span>
          <span> -&nbsp;{event.date.toLocaleString()}</span>
          <span> &nbsp; id: {event._id}</span>
        </p>
      </div>

      {visible ? (
        <form className="admin-item__form" onSubmit={(e) => e.preventDefault()}>
          <div className="admin-item__field">
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

          <div className="admin-item__field">
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

          <div className="admin-item__field">
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

          <div className="admin-item__field">
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

          <div className="admin-item__field">
            <label>
              Description:
              <textarea
                rows={5}
                name="description"
                disabled={!editMode}
                value={form.description}
                onChange={handleClickForm}
              />
            </label>
          </div>

          <div className="admin-item__field">
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

          <div className="admin-item__img">
            <img style={{ width: '100px' }} src={event.posterUrl} alt="eventPoster" />
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
                    handleDeleteEvent(event._id);
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </form>
      ) : (
        ''
      )}
    </li>
  );
};

export default AdminEventCard;
