// import {createStore} from 'react-redux';
import Reducer from './Reducer';
import{createStore} from 'redux';

const store = createStore(Reducer);

export default store;