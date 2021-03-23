import React from 'react';

const Modal = ({ visible, setVisible, children }) => {
  const popupRef = React.useRef();

  const handleEscKeyDown = (e) => {
    const isEsc = e.keyCode === 27;
    if (visible && isEsc) {
      setVisible(false);
    }
  };

  const handleClickOutPopup = (e) => {
    const isOutside = !e.path.includes(popupRef.current);
    if (visible && isOutside) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);
    document.addEventListener('click', handleClickOutPopup);

    return function () {
      document.removeEventListener('keydown', handleEscKeyDown);
      document.removeEventListener('click', handleClickOutPopup);
    };
  });

  return (
    <>
      {visible && (
        <div className="popup">
          <div className="popup__top">
            <div ref={popupRef} className="popup__inner">
              {children}
              <div className="popup__close" onClick={() => setVisible(false)}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
