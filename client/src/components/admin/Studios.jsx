import React from 'react';
import useHttp from '../../hooks/custom.hook';
import { Paper} from '@material-ui/core';
import { Table, TableGroupedName, StudioModal, Backdrop } from '../mui';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllStudios,  
  addStudioWithGroupName,
  removeStudioWithoutGroupNameById,
  removeStudioWithGroupName,
  addStudioWihoutGroupName,
} from '../../redux/adminStudiosReducer';
import { fireBaseAdapter } from '../../utils';
import {NewStudio} from '../'
import {BASE_URL} from '../../constants'

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

  if (!allStudios.length) {
    return (
      <div className="admin-studios__wrap">
        <Paper elevation={3}>
          <Backdrop />
          <NewStudio setToggle={setToggle} />
        </Paper>
      </div>
    );
  };

  return (
    <div className="admin-studios__wrap">
      <Paper elevation={3}>
        {toggle ? (
          <div>
            <p className="admin-studios__showlist" onClick={() => setToggle(false)}>
              Показать список
            </p>
            <NewStudio setToggle={setToggle} />
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
