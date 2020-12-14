import React from 'react';
import { Route} from 'react-router-dom';
import Footer from './components/footer';
import { AuthConext } from './context/auth.context';
import useAuth from './hooks/auth.hook';

import Home from './pages/home';
import About from './pages/about';
import Events from './pages/events';
import Studios from './pages/studios';
import Schedule from './pages/schedule';
import Documents from './pages/documents';
import Contacts from './pages/contacts';
import DetailPage from './pages/detail-page';
import AdminPage from './pages/admin-page';
import Login from './pages/login';
import { events as eventsMock } from './data/events-mock';

function App() {
  const { token, userId, login , logout} = useAuth();

  const isAuth = !!token;


  
  return (
    <AuthConext.Provider value={{ token, userId, isAuth, login, logout }}>
      <div className="App">
        <div className="App__content">
          <Route path="/" exact>          
            <Home />          
          </Route>
          <Route path="/about" component={About} />
          <Route path="/events" exact>
            <Events/>
          </Route>
          <Route path="/studios" exact>
            <Studios />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
          <Route path="/schedule" component={Schedule} />
          <Route path="/documents" component={Documents} />
          <Route path="/contacts" component={Contacts} />  
          
          {/* {isAuth ? <AdminPage/> : <Login/>} */}
          {/* <Route path="/admin" component={AdminPage} exact />  */}
          <Route path="/admin" exact>
            <AdminPage />
          </Route>

          <Route path="/login" component={Login} exact />  
          
        </div>
        <div className="App__footer">
          <Footer />
        </div>
      </div>
    </AuthConext.Provider>
  );
}

export default App;
