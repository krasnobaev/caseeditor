import { combineReducers } from 'redux'
import Rx from 'rxjs/Rx'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineEpics } from 'redux-observable'

/* actions */

const INITIALIZE_APP = 'INITIALIZE_APP';
const LOAD_FILE = 'LOAD_FILE';
const SAVE_FILE = 'SAVE_FILE';
const CHANGE_CASE = 'CHANGE_CASE';

/* action creators */

export const actionInitializeApp = (oInitialState) => {
  return { type: INITIALIZE_APP, oInitialState };
}
export const actionLoadFile = (sFileName) => {
  return { type: LOAD_FILE, sFileName };
}
export const actionSaveFile = (sFileBody) => {
  return { type: SAVE_FILE, sFileBody };
}
export const actionChangeCase = (iNewCurCase) => {
  return { type: CHANGE_CASE, iNewCurCase };
}

/* epics */

const initializeEpic = (action$, store) => action$
  .ofType(INITIALIZE_APP)
  .delay(1000)
  .concatMap(action => [
    // actionLoadFile({}),
  ]);

// no need for BehaviorSubject actually since ATB mechanism done in simple epics
const rootEpic$ = new BehaviorSubject(combineEpics(
  initializeEpic
));
export const rootEpic = (action$, store) =>
  rootEpic$.mergeMap(epic => epic(action$, store));

/* reducers */

const MainState = (state = {}, {
  type,

  curfile,
  iNewCurCase,
} = action) => {
  switch (type) {
    case INITIALIZE_APP:
      return Object.assign({}, state, oInitialState);
    case LOAD_FILE:
      return Object.assign({}, state, {
        curloadedfile: curfile,
      });
    case SAVE_FILE:
      return Object.assign({}, state);
    case CHANGE_CASE:
      return Object.assign({}, state, {
        curcase: iNewCurCase,
      });

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  MainState
})
