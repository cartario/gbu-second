import React from 'react';
import useHttp from '../../hooks/http.hook';
import FileInputComponent from '../FileInput';

const AdminEventNewCard = ({ handleShowNewEvent }) => {
  const { request } = useHttp();

  const [form, setForm] = React.useState({
    title: '',
    date: '',
    category: '',
    place: '',
    description: '',
    posterUrl: '',
    photos: '',
    booked: false
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

  const handleSubmit = async () => {
   if(window.confirm('Вы действительно хотите добавить новое событие?')){
    try {
      const response = await request('/api/events/create', 'POST', form);
      setEvent(response);
      window.location.reload(); //temporary
    } catch (err) {}
   }
  };

  const onFileInputChange = React.useCallback((url) => {
    setForm({ ...form, posterUrl: url });
  }, []);

  return (
    <div className="admin-item admin-item--new">
      <p
        className="admin-item__title"
        onClick={() => {
          handleShowNewEvent(false);
        }}
      >
        New event
      </p>

      <form className="admin-item__form" onSubmit={(e) => e.preventDefault()}>
        <div className="admin-item__field">
          {/* <label>
            PosterImage:
            <input name="posterUrl" type="text" value={form.posterUrl} onChange={handleClickForm}/>
            
          </label> */}

          <FileInputComponent handler={onFileInputChange} initialImgUrl={form.posterUrl} />
        </div>

        <div className="admin-item__field">
          <label>
            *Title:
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Date:
            <input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Category:
            <input
              name="category"
              type="text"
              value={form.category}
              onChange={handleClickForm}
              required
              placeholder='конкурс, соревнование, концерт и тд, желательно избегать спорт или досуг'
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            Place:
            <input name="place" type="text" value={form.place} onChange={handleClickForm} />
          </label>
        </div>

        <div className="admin-item__field">
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

        <div className="admin-item__field">
          <label>
            Photos:
            <input
              name="photos"
              type="text"
              value={form.photos}
              onChange={handleClickForm}
            />
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

export default AdminEventNewCard;
