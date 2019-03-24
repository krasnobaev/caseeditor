import { connect } from 'react-redux';
import {
  actionLoadFile,
  actionSaveFile,
  actionChangeCase,
  actionEditInCase,
  actionEditOutCase,
} from '../ducks/main';
import { Case } from '../components/Case.js';
import { ControlPanel } from '../components/ControlPanel.js';

const mapStateToProps = (_state, own) => {
  let state = _state.MainState || {};

  let { curcase } = state;
  let cases = state.cases || [];
  let curcasecopy = cases[curcase] || {};
  let curcasedesc = curcasecopy.desc || '';
  let curcasein = curcasecopy.in || '';
  let curcaseout = curcasecopy.out || '';

  return {
    state,

    cases,
    curcase,
    curcasedesc,
    curcasein,
    curcaseout,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onFileLoad: () => {
      dispatch(actionLoadFile());
    },
    onFileSave: () => {
      dispatch(actionSaveFile());
    },
    onCaseSelect: (icase) => {
      dispatch(actionChangeCase(icase))
    },
    onCaseEdit: (stype, newvalue) => {
      if (stype === 'in') {
        dispatch(actionEditInCase(newvalue));
      } else if (stype === 'out') {
        dispatch(actionEditOutCase(newvalue));
      } else {
        console.warn('unkown case type');
      }
    },
  }
}

export const VisibleCase = connect(
  mapStateToProps,
  mapDispatchToProps
)(Case)

export const VisibleControlPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)
