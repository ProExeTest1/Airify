import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));
// =======
// import {rootReducer} from './reducers';

// export const store = createStore(rootReducer, applyMiddleware(thunk));
// >>>>>>> origin/KenilBranch
