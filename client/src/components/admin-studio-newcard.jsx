import React from 'react';
import useHttp from '../hooks/http.hook';

const AdminStudioNewCard = ({ handleShowNewStudio }) => {
  const { request } = useHttp();

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

  const handleSubmit = async () => {
    try {
      const response = await request('/api/studios/create', 'POST', form);
      setStudio(response);
    } catch (err) {}
  };

  return (
    <div className="admin-item admin-item--new">
      <p
        className="admin-item__title"
        onClick={() => {
          handleShowNewStudio(false);
        }}
      >
        New studio
      </p>

      <form className="admin-item__form">
        <div className="admin-item__field">
          <label>
            *Название группы студий/секций
            <input name="name" type="text" value={form.name} onChange={handleClickForm} required />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Название студии/секции
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
            *Номер группы студии/секции:
            <input
              name="groupNumber"
              type="text"
              value={form.groupNumber}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Место проведения занятий:
            <input
              name="adress"
              type="text"
              value={form.adress}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
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

        <div className="admin-item__field">
          <label>
            *День недели:
            <input name="day" type="text" value={form.day} onChange={handleClickForm} required />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Стоимость:
            <input
              name="price"
              type="text"
              value={form.price}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Время начала занятий:
            <input
              name="timeFrom"
              type="text"
              value={form.timeFrom}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Время окончания занятий:
            <input
              name="timeTo"
              type="text"
              value={form.timeTo}
              onChange={handleClickForm}
              required
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            *Категория:
            <input name="type" type="text" value={form.type} onChange={handleClickForm} required />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            isDuplicate:
            <input
              name="isDuplicate"
              type="text"
              value={form.isDuplicate}
              onChange={handleClickForm}
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            age_max:
            <input name="age_max" type="text" value={form.age_max} onChange={handleClickForm} />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            cab:
            <input name="cab" type="text" value={form.cab} onChange={handleClickForm} />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            teacher:
            <input name="teacher" type="text" value={form.teacher} onChange={handleClickForm} />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            priceOptions:
            <input
              name="priceOptions"
              type="text"
              value={form.priceOptions}
              onChange={handleClickForm}
            />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            imgUrl:
            <input name="imgUrl" type="text" value={form.imgUrl} onChange={handleClickForm} />
          </label>
        </div>

        <div className="admin-item__field">
          <label>
            description:
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
            status:
            <input name="status" type="text" value={form.status} onChange={handleClickForm} />
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

export default AdminStudioNewCard;
