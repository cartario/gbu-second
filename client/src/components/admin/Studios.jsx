import React from 'react';
import useHttp from '../../hooks/custom.hook';
import { Paper, Dialog } from '@material-ui/core';
import { Input, Button, Table, TableGroupedName, StudioModal } from '../mui';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllStudios,
  addStudio,
  addStudioWithGroupName,
  removeStudioWithoutGroupNameById,
  removeStudioWithGroupName,
  addStudioWihoutGroupName,
} from '../../redux/adminStudiosReducer';
import { fireBaseAdapter } from '../../utils';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import { Button as ButtonMUI } from '@material-ui/core';

const BASE_URL = 'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/studios';

const initialState = {
  group_name: null,
  studio_name: '',
  sub_studio_number: '',
};

const NewStudioForm = ({ setToggle }) => {
  const { request } = useHttp();
  const [form, setForm] = React.useState(initialState);
  
  const dispatch = useDispatch();
  
  const handleChange = (obj) => {
    const { name, value } = obj;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const resData = await request(`${BASE_URL}.json`, 'POST', form);
    const id = resData.name;
    dispatch(addStudio({ ...form, id }));
    setToggle(false);
  };

  const { studio_name, sub_studio_number } = form;

  return (
    <>
      <h3>Новая студия/секция</h3>
      <Input
        text="Название студии/секции"
        data={studio_name}
        name="studio_name"
        next={handleChange}
      />
      <Input
        text="Номер подгруппы"
        data={sub_studio_number}
        name="sub_studio_number"
        next={handleChange}
      />
      <Button disabled={false} onClick={handleSubmit} />
    </>
  );
};

export default function Studios() {
  const { request } = useHttp();
  const [toggle, setToggle] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(null);
  
  const { allStudios, studiosWithoutGroupName, studiosWithGroupName } = useSelector(
    ({ adminStudios }) => adminStudios,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      const response = await request(`${BASE_URL}/.json`);
      dispatch(setAllStudios(fireBaseAdapter(response)));
    })();
  }, []);

  if (!allStudios.length) {
    return (
      <div className="admin-studios__wrap">
        <Paper elevation={3}>
          <p>список студий пуст</p>
          <NewStudioForm setToggle={setToggle} />
        </Paper>
      </div>
    );
  };

  const handleToggleModal = (value) => {
    setModal(value)
  }

  const handleGroup = (obj, name) => {
    obj.forEach((each) => {
      const { id } = each;
      dispatch(removeStudioWithoutGroupNameById(id));
      (async function () {
        await request(`${BASE_URL}/${id}.json`, 'PATCH', { group_name: name });
      })();
    });
    dispatch(addStudioWithGroupName(obj.map((each) => ({ ...each, group_name: name }))));
  };

  const handleUngroup = (obj) => {
    obj.forEach((each) => {
      const { id } = each;
      dispatch(removeStudioWithGroupName(id));
      dispatch(addStudioWihoutGroupName(id));
      (async function () {
        await request(`${BASE_URL}/${id}.json`, 'PATCH', { group_name: null });
      })();
    });
  };

  const handleDelete = async (id)=>{
    if(window.confirm('Вы действительно хотите удалить?')){
      dispatch(removeStudioWithoutGroupNameById(id));
      await request(`${BASE_URL}/${id}.json`, 'DELETE');
    }
  }

  const handleEdit = (id)=>{
    setCurrentId(id);
    handleToggleModal(true);
  }

  return (
    <div className="admin-studios__wrap">
      <Paper elevation={3}>
        {toggle ? (
          <div>
            <p className="admin-studios__showlist" onClick={() => setToggle(false)}>
              Показать список
            </p>
            <NewStudioForm setToggle={setToggle} />
          </div>
        ) : (
          <div>
            <button className="admin-section__button" onClick={() => setToggle(true)}>
              +
            </button>

            <Table
              onGroupClick={handleGroup}
              onDelete={handleDelete}
              onEdit={handleEdit}              
              tableName="Студии/секции:"
              data={studiosWithoutGroupName}
            />
            
            <StudioModal id={currentId} modal={modal} handleToggleModal={handleToggleModal}/>
            
            {studiosWithGroupName.map((item) => {
              return (
                <>
                  

                  {item.length ? (
                    <>
                      <TableGroupedName data={item} onUngroup={handleUngroup}/>

                      {/* <div style={{ margin: '10px' }}>
                        groupedName {item[0].group_name} ---{' '}
                        {item.map((each) => (
                          <span>{each.id}__</span>
                        ))}
                        <ButtonMUI
                          onClick={() => handleUngroup(item)}
                          variant="contained"
                          color="secondary"
                          startIcon={<LinkOffIcon />}
                        >
                          Разгруппировать
                        </ButtonMUI>
                      </div> */}
                    </>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
          </div>
        )}
      </Paper>
    </div>
  );
}
