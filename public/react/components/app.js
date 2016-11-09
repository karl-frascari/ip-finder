import store from '../store';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import IpLocationFinder from './home';

ReactDOM.render(
  <Provider store={store}>
    <IpLocationFinder />
  </Provider>,
  document.getElementById('containerUiChallenge')
);