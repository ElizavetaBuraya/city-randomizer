import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Container from './containers/AppContainer';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
