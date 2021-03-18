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
import Afisha from './pages/afisha';
import Documents from './pages/documents';
import Contacts from './pages/contacts';
import DetailPage from './pages/detail-page';
import Minors from './pages/minors';
import Admin from './pages/admin';
import extrapages from './pages/extrapages';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';

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
          <Route path="/afisha" component={Afisha} />
          <Route path="/documents" component={Documents} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/minors" component={Minors} />
          <Route path="/admin" exact component={Admin}/>  
          <Route path="/extrapages" exact component={extrapages}/>
          <Route path="/page1" exact component={Page1}/>
          <Route path="/page2" exact component={Page2}/>
          <Route path="/page3" exact component={Page3}/>
                            
        </div>
        <div className="App__footer">
          <Footer />
        </div>
      </div>
    </AuthConext.Provider>
  );
}

export default App;
