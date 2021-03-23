import React, { useCallback } from 'react';
import AdminEventCard from '../components/admin-event-card';
import AdminEventNewCard from '../components/admin-event-newcard';
import AdminStudioCard from '../components/admin-studio';
import AdminStudioNewCard from '../components/admin-studio-newcard';
import AdminMainPost from '../components/admin-main-post';
import useHttp from '../hooks/http.hook';
import { useContext } from 'react';
import { AuthConext } from '../context/auth.context';
import ScheduleDocs from '../components/schedule-docs';
import AfishaScheduleDocs from '../components/afisha-schedule-docs';
import PushNotificationsComponent from '../components/pushNotifications';
import AdminContactPage from '../components/admin-contact-page';
import AdminSection from '../components/admin-section';
import AdminSumPage from '../components/admin-sum-page';
import AdminPageJoin from '../components/admin-page-join';
import AdminPage1 from '../components/admin-page1';
import AdminPage2 from '../components/admin-page2';
import AdminPage3 from '../components/admin-page3';
import AdminCreatePage from '../components/admin-create-page';
import AdminPageTemplate from '../components/admin-page-template';


const AdminPage = ({paths}) => {
  const { request, loading, error, clearError } = useHttp();
  const [events, setEvents] = React.useState(null);
  const [studios, setStudios] = React.useState(null);

  const auth = useContext(AuthConext);

  const [showNewEvent, setshowNewEvent] = React.useState(false);
  const [showNewStudio, setshowNewStudio] = React.useState(false);

  const handleShowNewEvent = (value) => {
    setshowNewEvent(value);
  };

  const handleShowNewStudio = (value) => {
    setshowNewStudio(value);
  };

  const getStudios = useCallback(async () => {
    try {
      const response = await request(`/api/studios`);
      setStudios(response);
    } catch (err) {}
  }, [request]);

  const getEvents = useCallback(async () => {
    try {
      const response = await request(`/api/events`);
      setEvents(
        response.map((event) => {
          const date = new Date(event.date);
          return { ...event, date };
        }),
      );
    } catch (err) {}
  }, [request]);

  React.useEffect(() => {
    getStudios();
    getEvents();
  }, [getStudios, getEvents]);

  if (!studios) {
    return <h1>Loading...</h1>;
  }

  const namesOfGroup = [...new Set(studios.map((studio) => studio.name))];
  const studiosBynamesOfGroup = namesOfGroup.map((group) =>
    studios.filter((studio) => studio.name === group),
  );

  const StudiosByGroup = ({ studios }) => {
    return (
      <ul>
        {studios.map((studio) => (
          <AdminStudioCard key={studio._id} studio={studio} />
        ))}
      </ul>
    );
  };

  

  return (
    <div style={{ marginBottom: '50px' }}>
      <h1>AdminPage</h1>
      <nav>
        <ul>
          <li>
            <a href="/">На главную</a>
          </li>
          <li style={{ margin: '20px' }}>
            {' '}
            <a href="/admin" onClick={() => auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <AdminSection sectionName="Суммарные показатели" backgroundColor="pink" color="tomato">
        <AdminSumPage />
      </AdminSection>

      <AdminSection sectionName="Мероприятия" backgroundColor="#f48fb1" color="#880e4f">
        <>
          {showNewEvent ? (
            <AdminEventNewCard handleShowNewEvent={handleShowNewEvent} />
          ) : (
            <button className="admin-section__button" onClick={() => handleShowNewEvent(true)}>
              +
            </button>
          )}

          <ul>
            {events ? (
              events.map((event) => (
                <AdminEventCard setEvents={setEvents} key={event._id} event={event} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </>
      </AdminSection>

      <PushNotificationsComponent />

      <ScheduleDocs />

      <AfishaScheduleDocs />

     

      <AdminMainPost />

      <AdminSection sectionName="Студии/секции" backgroundColor="#c8e6c9" color="#1b5e20">
        <>
          {showNewStudio ? (
            <AdminStudioNewCard handleShowNewStudio={handleShowNewStudio} />
          ) : (
            <button className="admin-section__button" onClick={() => handleShowNewStudio(true)}>
              +
            </button>
          )}

          {studiosBynamesOfGroup.map((studios, index) => {           

            const isPayGroup = studios.find((studio)=>studio.price!=='free');

            return (
              <div key={index} className={isPayGroup ? `admin-groups admin-groups--pay` : `admin-groups`}>
                <p>
                  {index + 1} Группа студий: {studios[0].name}
                </p>
                <StudiosByGroup studios={studios} />
              </div>
            );
          })}
        </>
      </AdminSection>

      <AdminSection sectionName="Страница-Контакты" backgroundColor="pink" color="tomato">
        <AdminContactPage />
      </AdminSection>

      <AdminSection sectionName="Присоединиться" backgroundColor="rgb(128, 203, 196)" color="#e65100">
        <AdminPageJoin />
      </AdminSection>

      <AdminSection sectionName="Страница-Московское долголетие" backgroundColor="#ff9800" color="#e65100">
        <AdminPage1 />
      </AdminSection>

      <AdminSection sectionName="Страница-Лента памяти" backgroundColor="rgb(244 142 177)" color="#e65100">
        <AdminPage2 />
      </AdminSection>

      <AdminSection sectionName="Страница-Города воинской славы" backgroundColor="rgb(128, 203, 196)" color="#e65100">
        <AdminPage3 />
      </AdminSection>

      {paths&&paths.map((each)=>
        <AdminSection sectionName={`Страница - ${each}`} 
        key={each}
        backgroundColor={`#${Math.floor(Math.random()*16777215).toString(16)}`}
        color="#000">
        
          <AdminPageTemplate path={each}/>
        </AdminSection>
      )}

      <AdminSection sectionName="Создание новой страницы" backgroundColor="rgb(244 142 177)" color="#e65100">
        <AdminCreatePage />
      </AdminSection>
    </div>
  );
};

export default AdminPage;
