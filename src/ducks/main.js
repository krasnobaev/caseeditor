import { combineReducers } from 'redux'
import Rx from 'rxjs/Rx'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineEpics } from 'redux-observable'

/* actions */

const INITIALIZE_APP = 'INITIALIZE_APP';
const LOAD_FILE = 'LOAD_FILE';
const SAVE_FILE = 'SAVE_FILE';
const CHANGE_CASE = 'CHANGE_CASE';
const UPDATE_IN_CASE = 'UPDATE_IN_CASE';
const UPDATE_OUT_CASE = 'UPDATE_OUT_CASE';

/* action creators */

export const actionInitializeApp = (oInitialState) => {
  return { type: INITIALIZE_APP, oInitialState };
}
export const actionLoadFile = (sFile) => {
  return { type: LOAD_FILE, sFile };
}
export const actionSaveFile = (sFile, sData) => {
  return { type: SAVE_FILE, sFile, sData };
}
export const actionChangeCase = (iNewCurCase) => {
  return { type: CHANGE_CASE, iNewCurCase };
}
export const actionEditInCase = (sNewCaseValue) => {
  return { type: UPDATE_IN_CASE, sNewCaseValue };
}
export const actionEditOutCase = (sNewCaseValue) => {
  return { type: UPDATE_OUT_CASE, sNewCaseValue };
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
  sNewCaseValue,
} = action) => {
  let { curcase } = state;
  let cases = state.cases || [];

  if (sNewCaseValue) {
    if (type === UPDATE_IN_CASE) {
      cases[curcase].in = sNewCaseValue;
    } else if (type === UPDATE_OUT_CASE) {
      cases[curcase].out = sNewCaseValue;
    } else {
      console.warn('unkown action while changing case value');
    }
  }

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
    case UPDATE_IN_CASE:
    case UPDATE_OUT_CASE:
      return Object.assign({}, state, {
        cases,
      });

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  MainState
})
