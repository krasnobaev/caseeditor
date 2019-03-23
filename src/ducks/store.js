import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';

import { rootEpic, rootReducer } from './main';

export const getInitializedStore = () => {
  return {
    MainState: {
      curfile: './tests.cases',
      curloadedfile: '',
      curcase: 0,
      curcasecopy: {
        description: 'somcase',
        in: '1\n2\n3\n',
        out: '8',
      },
      cases: [{
        description: 'somcase',
        in: '1\n2\n3\n',
        out: '8',
      }, {
        in: '4\n5\n6\n',
        out: '3',
      }],
    },
  };
};

let state = getInitializedStore();
const epicMiddleware = createEpicMiddleware();

export const configureStore = (initialState = state) => {
  let store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      epicMiddleware,
      logger
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
};
