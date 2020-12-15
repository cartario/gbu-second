import React from 'react';
import useHttp from '../hooks/http.hook';

const daysOfWeek = ['Восересенье ','Понедельник ','Вторник ','Среда ','Четверг ','Пятница ','Суббота '];

const AdminStudioCard = ({ studio }) => {
  const [visible, setVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState(studio);
  const { request } = useHttp();

  const handleClickForm = (e) => {
    const target = e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: target,
    });
  };

  const handleEditMode = (e) => {    
    setEditMode(!editMode);
    handleUpdateStudio(form);
  };

  const handleDeleteStudio = (id) => {
    request(`api/studios/${id}`, 'DELETE');
  };

  const handleUpdateStudio = (form) => {
    if (editMode) {
      request(`api/studios/${form._id}`, 'PATCH', form);
    }
  };

  const handleToggleForm = () => {
    setVisible(!visible);
  };

  return (
    <li className="admin-item">
      <div className="admin-item__top">
        <p className="admin-item__title" onClick={handleToggleForm}>
          {/* <span>Группа студий: {studio.name}</span>
          <br /> */}
          <span>Студия/секция: {studio.title}</span>
          {/* <span> &nbsp; id: {studio._id}</span> */}
        <span>{daysOfWeek[studio.day]}</span>
        <span> {studio.timeFrom} - {studio.timeTo}</span>
        
        </p>
      </div>

      {visible ? (
        <div>
          <form className="admin-item__form" onSubmit={(e) => e.preventDefault()}>
            <div className="admin-item__field">
              <label>
                *Название группы студий/секций
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleClickForm}
                  disabled={!editMode}
                  required
                />
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
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
                  required
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                *День недели:
                <input
                  name="day"
                  type="text"
                  value={form.day}
                  disabled={!editMode}
                  onChange={handleClickForm}
                  required
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                *Стоимость:
                <input
                  name="price"
                  type="text"
                  value={form.price}
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
                  onChange={handleClickForm}
                  required
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                *Категория:
                <input
                  name="type"
                  type="text"
                  value={form.type}
                  disabled={!editMode}
                  onChange={handleClickForm}
                  required
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                isDuplicate:
                <input
                  name="isDuplicate"
                  type="text"
                  value={form.isDuplicate}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                age_max:
                <input
                  name="age_max"
                  type="text"
                  value={form.age_max}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                cab:
                <input
                  name="cab"
                  type="text"
                  value={form.cab}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                teacher:
                <input
                  name="teacher"
                  type="text"
                  value={form.teacher}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                priceOptions:
                <input
                  name="priceOptions"
                  type="text"
                  value={form.priceOptions}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                imgUrl:
                <input
                  name="imgUrl"
                  type="text"
                  value={form.imgUrl}
                  onChange={handleClickForm}
                  disabled={!editMode}
                  
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                description:
                <textarea
                  name="description"
                  type="text"
                  value={form.description}
                  disabled={!editMode}
                  rows={5}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div className="admin-item__field">
              <label>
                status:
                <input
                  name="status"
                  type="text"
                  value={form.status}
                  disabled={!editMode}
                  onChange={handleClickForm}
                />
              </label>
            </div>

            <div>
              <img
                style={{ width: '100px' }}
                src={
                  studio.imgUrl ||
                  'https://bayramix.ru/local/templates/bayramix_new/images/load.gif'
                }
                alt="studioPoster"
              />
            </div>

            <div className="admin-item__controls">
            <button className="admin-item__controls--edit" onClick={handleEditMode}>{editMode ? 'Save' : 'Edit'}</button>
            {editMode ? (
              <>
              <button className="admin-item__controls--cancel" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button
                className="admin-item__controls--delete"
                onClick={() => {
                  handleDeleteStudio(studio._id);
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
        </div>
      ) : (
        ''
      )}
    </li>
  );
};

export default AdminStudioCard;
