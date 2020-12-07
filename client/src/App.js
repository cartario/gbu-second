import { Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Events from './pages/events';
import Studios from './pages/studios';
import Schedule from './pages/schedule';
import Documents from './pages/documents';
import Contacts from './pages/contacts';
import DetailPage from './pages/detail-page';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <div className="App__content">
        <Navbar />
        <Route path={['/', '/gbu-dan']} exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/events" component={Events} />
        <Route path="/studios" exact component={Studios} />
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/schedule" component={Schedule} />
        <Route path="/documents" component={Documents} />
        <Route path="/contacts" component={Contacts} />
      </div>
      <div className="App__footer">
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
