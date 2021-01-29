import Petshop from 'components/Petshop';
import ScrollToTop from 'components/ScrollToTop';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import store from './store';

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
