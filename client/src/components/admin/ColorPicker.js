import React from 'react';

export default function Picker ({initial, name, next}) {
  const [color, setColor]  = React.useState(initial);
  const inputRef = React.useRef();

  const handleChange = (e) => {
    setColor(e.target.value);

    next({
      name,
      value: e.target.value
    })
  }

  const handleClick = () => {
    inputRef.current.click()
  }

  //иногда не отрисовывает сразу
  React.useEffect(()=>{
    setColor(initial);
  }, [initial])

  return (
    <div> 
      <input ref={inputRef} type="color" id="head" name="head" value={color} onChange={handleChange} style={{visibility: 'hidden'}}/>         
      
      <div 
      onClick={handleClick}
      style={{
        width: '60px',
        height: '60px',
        margin: '0 auto',
        background: color,
        borderRadius: '15px',
        cursor: 'pointer'
      }}>
      </div>

    </div>)
};