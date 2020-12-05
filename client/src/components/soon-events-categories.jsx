import React from 'react';

const SoonEventsCategories = ({ categories, setFilteredEvents, setCount, events }) => {
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(null);  

  const handleClickVisible = () => {
    setVisible(!visible);
    setActive(null);

    if (visible) {
      setFilteredEvents(events);
    }
  };

  const handleClickActive = (index, category) => {

    setCount(0);
    setFilteredEvents(events.filter((event) => event.category === category));

    // setActive(index);
    // setVisible(true);

    if (active !== index) {
      setActive(index);
      setVisible(true);
      
      
    } else {
      setVisible(false);
      setActive(null);
      setFilteredEvents(events);
    }
  };

  return (
    <ul className="soon-events__categories">
      <li
        className={`soon-events__categorie soon-events__categorie--close ${
          visible ? '' : 'hidden'
        }`}
        onClick={handleClickVisible}
      ></li>
      {categories &&
        categories.map((category, index) => (
          <li            
            key={category}
            onClick={() => handleClickActive(index, category)}
            className={`soon-events__categorie ${active === index ? 'active' : ''}`}
          >
            {category}
          </li>
        ))}
    </ul>
  );
};

export default SoonEventsCategories;
