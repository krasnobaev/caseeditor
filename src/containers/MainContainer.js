import { connect } from 'react-redux';
import { actionLoadFile, actionSaveFile, actionChangeCase } from '../ducks/main';
import { Case } from '../components/Case.js';
import { CaseList } from '../components/CaseList.js';
import { ControlPanel } from '../components/ControlPanel.js';

const mapStateToProps = (state, own) => {
  return {
    state: state.MainState,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onFileLoad: () => {
      console.log('file load dispatched');
      dispatch(actionLoadFile());
    },
    onFileSave: () => {
      console.log('file save dispatched');
      dispatch(actionSaveFile());
    },
    onCaseSelect: () => {
      console.log('case select dispatched');
      dispatch(actionChangeCase())
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
