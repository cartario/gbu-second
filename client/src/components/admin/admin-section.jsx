import React from 'react';

const AdminSection = ({ backgroundColor, color, sectionName, children }) => {
  const [visible, setVisible] = React.useState(false);


  const hadleToggle = () => {
    setVisible(!visible);
  }

  return (
    <div className="admin-section" style={{ backgroundColor }}>
      <h2 
      onClick={hadleToggle}
      style={{ cursor: 'pointer', margin: '0px', color }}>{sectionName} {visible? '(свернуть)' : '(развернуть)'}</h2>
      {visible&&children}
    </div>
  );
};

export default AdminSection;
