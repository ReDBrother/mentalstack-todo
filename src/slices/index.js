import alertSlice from './alert';

const reducers =  {
  alert: alertSlice.reducer,
};

export const actions = {
  ...alertSlice.actions,
};

export default reducers;
