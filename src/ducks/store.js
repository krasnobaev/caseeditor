import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';

import { rootEpic, rootReducer } from './main';

export const getInitializedStore = () => {
  return {
    MainState: {
      file: './tests.cases',
      cases: [],
    },
  };
};

let state = getInitializedStore();
const epicMiddleware = createEpicMiddleware();

export const configureStore = (initialState = state) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      epicMiddleware,
      logger
    )
  );
};
// epicMiddleware.run(rootEpic);
