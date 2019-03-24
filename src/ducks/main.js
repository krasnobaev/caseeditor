import { combineReducers } from 'redux'
import Rx from 'rxjs/Rx'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineEpics } from 'redux-observable'
import { load_file, save_file } from '../lib/io.js'

/* actions */

const INITIALIZE_APP = 'INITIALIZE_APP';
const LOAD_FILE = 'LOAD_FILE';
const SAVE_FILE = 'SAVE_FILE';
const ACTUAL_SAVE_FILE = 'ACTUAL_SAVE_FILE';
const CHANGE_CASE = 'CHANGE_CASE';
const CHANGE_CASE_ACTUAL = 'CHANGE_CASE_ACTUAL';
const UPDATE_IN_CASE = 'UPDATE_IN_CASE';
const UPDATE_OUT_CASE = 'UPDATE_OUT_CASE';
const FILELOAD_SUCCESSFULL = 'FILELOAD_SUCCESSFULL';
const FILELOAD_UNSUCCESSFULL = 'FILELOAD_UNSUCCESSFULL';
const FILESAVE_SUCCESSFULL = 'FILESAVE_SUCCESSFULL';
const FILESAVE_UNSUCCESSFULL = 'FILESAVE_UNSUCCESSFULL';
const SAVE_CASE = 'SAVE_CASE';

/* action creators */

export const actionInitializeApp = (oInitialState) => {
  return { type: INITIALIZE_APP, oInitialState };
}
export const actionLoadFile = (sFile) => {
  return { type: LOAD_FILE, sFile };
}
export const actionSaveFile = () => {
  return { type: SAVE_FILE };
}
export const actionChangeCase = (iNewCurCase) => {
  return { type: CHANGE_CASE, iNewCurCase };
}
export const actionChangeCaseActual = (iNewCurCase) => {
  return { type: CHANGE_CASE_ACTUAL, iNewCurCase };
}
export const actionEditInCase = (sNewCaseValue) => {
  return { type: UPDATE_IN_CASE, sNewCaseValue };
}
export const actionEditOutCase = (sNewCaseValue) => {
  return { type: UPDATE_OUT_CASE, sNewCaseValue };
}
export const actionStoreCase = (oNewCase) => {
  return { type: SAVE_CASE, oNewCase };
}

/* epics */

const initializeEpic = (action$, store) => action$
  .ofType(INITIALIZE_APP)
  .concatMap(action => [
    actionLoadFile(store.value.MainState.curfile),
  ]);

const loadEpic = (action$, store) => action$
  .ofType(LOAD_FILE)
  .map(() => {
    try {
      let state = store.value.MainState;
      let sFile = state.curloadedfile || state.curfile;
      let aNewCases = load_file(sFile);

      if (aNewCases) {
        return { type: FILELOAD_SUCCESSFULL, sFile, aNewCases };
      }
    } catch (err) {
      return { type: FILELOAD_UNSUCCESSFULL };
    }
  })

const changeCaseEpic = (action$, store) => action$
  .ofType(CHANGE_CASE)
  .concatMap(action => [
    actionStoreCase(store.value.MainState.curcasecopy),
    actionChangeCaseActual(action.iNewCurCase),
  ]);

const saveFileEpic = (action$, store) => action$
  .ofType(SAVE_FILE)
  .concatMap(action => [
    actionStoreCase({}),
  ])
  .map(() => {
    let state = store.value.MainState;
    let sFile = state.curloadedfile || state.curfile;
    let aData = state.cases;

    try {
      if (save_file(sFile, aData) === 'OK') {
        return { type: FILESAVE_SUCCESSFULL };
      } else {
        return { type: FILESAVE_UNSUCCESSFULL };
      };
    } catch (err) {
      return { type: FILESAVE_UNSUCCESSFULL };
    }
  })
  .ofType(FILESAVE_SUCCESSFULL)
  .map(() => {
    return { type: CHANGE_CASE_ACTUAL, iNewCurCase: 0 };
  });

// no need for BehaviorSubject actually since ATB mechanism done in simple epics
const rootEpic$ = new BehaviorSubject(combineEpics(
  initializeEpic, loadEpic, changeCaseEpic, saveFileEpic,
));
export const rootEpic = (action$, store) =>
  rootEpic$.mergeMap(epic => epic(action$, store));

/* reducers */

const MainState = (state = {}, {
  type,

  curfile,
  iNewCurCase,
  sNewCaseValue,
  oNewCase,
  aNewCases,
  sFile,
} = action) => {
  let { curcase } = state;
  let cases = state.cases || [];

  if (oNewCase) {
    cases[curcase] = oNewCase;
  }

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
    case CHANGE_CASE_ACTUAL:
      return Object.assign({}, state, {
        curcasecopy: cases[iNewCurCase],
        curcase: iNewCurCase,
      });
    case UPDATE_IN_CASE:
    case UPDATE_OUT_CASE:
    case SAVE_CASE:
      return Object.assign({}, state, {
        cases,
      });
    case FILELOAD_SUCCESSFULL:
      return Object.assign({}, state, {
        curfile: sFile,
        curloadedfile: sFile,

        curcase: 0,
        curcasecopy: aNewCases[0],
        cases: aNewCases,
      });
    case FILELOAD_UNSUCCESSFULL:
      return Object.assign({}, state, {
        curfile: '',
        curloadedfile: '',
        curcase: 0,
        curcasecopy: {},
        cases: [{}],
      });

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  MainState
})
