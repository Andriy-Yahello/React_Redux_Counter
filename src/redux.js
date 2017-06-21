export function createStore(reducer, initialState){
  let state = initialState;
  let callbacks = [];

  const getState = () => state;

  const dispatch = action =>{
    state= reducer(state, action);
    callbacks.forEach(callback => callback());

  };

  const subscribe = callback =>{
    callbacks.push(callback);
    return () => callback.filter(cb => cb!== callback);
  };

  dispatch({});

  //theese functions due to shortcuts have access to variebles state and callbacks
  return {getState, dispatch, subscribe};
}
