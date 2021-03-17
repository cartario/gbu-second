import React from 'react';

const AdminAddButton = ({ newItemName, children }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)} className="admin-section__button">
        +
      </button>

      {visible && (
        <div className="admin-item admin-item--new">
          <p className="admin-item__title">New {newItemName}
          <span onClick={()=>setVisible(false)}> свернуть</span>
          </p>
          {children}
        </div>
      )}
    </>
  );
};

export default AdminAddButton;
