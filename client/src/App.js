import React from 'react';
import { Route } from 'react-router-dom';

import {Footer} from './components';
import {Backdrop} from './components/mui';
import { AuthConext } from './context/auth.context';
import useAuth from './hooks/auth.hook';

import {About, Events, Studios,  Schedule, Afisha, Documents, Contacts,
DetailPage, Minors, Admin, extrapages, Page1, Page2, Page3, PageJoin,CreateNewPage, Home} from './pages';

import { adapterCreatePage as adapter } from './utils';


function App() {
  const { token, userId, login, logout } = useAuth();
  const isAuth = !!token;

  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/pages.json',
        );
        const resData = await response.json();
        const adaptedData = adapter(resData);
        setData(adaptedData);
      } catch (err) {
        setData({});
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <div className="App">
          <div className="App__content">
          <Backdrop />
          </div>
        </div>
      </>
    );
  }

  let paths;
  if (data.items) {
    paths = data.items.map((each) => each.pagePath);
  }

  return (
    <AuthConext.Provider value={{ token, userId, isAuth, login, logout }}>
      <div className="App">
        <div className="App__content">       
          {isAuth ? (
            <div>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/about" component={About} />
              <Route path="/events" exact>
                <Events />
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
            </div>
          ) : (
            <div>
              <p>ВЕДУТСЯ ТЕХНИЧЕСКИЕ РАБОТЫ</p>
              <a href="http://xn--80ahcoasjcyt5b.xn--p1ai/">Перейти на запасной сайт</a>
            </div>
          )}

          <Route path="/admin" exact>
            <Admin paths={paths} />
          </Route>

          <Route path="/extrapages" exact component={extrapages} />
          <Route path="/page1" exact component={Page1} />
          <Route path="/page2" exact component={Page2} />
          <Route path="/page3" exact component={Page3} />
          <Route path="/page-join" exact component={PageJoin} />

          {paths &&
            paths.map((each) => (
              <Route key={each} path={`/${each}`} exact>
                <CreateNewPage path={each} />
              </Route>
            ))}
        </div>
        <div className="App__footer">
          <Footer />
        </div>
      </div>
    </AuthConext.Provider>
  );
}

export default App;
