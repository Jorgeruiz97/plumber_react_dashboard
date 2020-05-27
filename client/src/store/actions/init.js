import * as at from './actionTypes';

const init = () => {
  return dispatch => {
    dispatch({ type: at.DATA, data: [] })
  }
}

export default init;
