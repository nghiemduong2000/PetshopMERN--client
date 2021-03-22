import axios from 'axios';
import Petshop from 'components/Petshop';
import ScrollToTop from 'components/ScrollToTop';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import store from './store';

axios.defaults.baseURL =
  'https://us-central1-petshop-mern-api-c2d07.cloudfunctions.net/app';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className='App'>
          <Petshop />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
