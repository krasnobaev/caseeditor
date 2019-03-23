import { connect } from 'react-redux';
import { actionLoadFile, actionSaveFile, actionChangeCase } from '../ducks/main';
import { Case } from '../components/Case.js';
import { CaseList } from '../components/CaseList.js';
import { ControlPanel } from '../components/ControlPanel.js';

const mapStateToProps = (_state, own) => {
  let state = _state.MainState || {};

  let { curcase } = state;
  let cases = state.cases || [];
  console.dir(['mapStateToProps', state, own]);
  let ocurcase = cases[curcase] || {desc: '', in: '', out: ''};
  let curcasedesc = ocurcase.desc;
  let curcasein = ocurcase.in;
  let curcaseout = ocurcase.out;

  return {
    state,

    cases,
    curcasedesc,
    curcasein,
    curcaseout,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onFileLoad: () => {
      console.dir(['curfile', own]);
      dispatch(actionLoadFile());
    },
    onFileSave: () => {
      console.dir(['curloadedfile', own.curloadedfile]);
      dispatch(actionSaveFile());
    },
    onCaseSelect: (icase) => {
      dispatch(actionChangeCase(icase))
    },
  }
}

export const VisibleCase = connect(
  mapStateToProps,
  mapDispatchToProps
)(Case)

export const VisibleCaseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseList)

export const VisibleControlPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)
