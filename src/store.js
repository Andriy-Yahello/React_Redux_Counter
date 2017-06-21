//let state =0;

function update(state, action){

  if (action.type === 'INCREMENT'){
    return {count:state.count + action.amount}
    //return state + action.amount;
  }else if (action.type === 'DECREMENT'){
    //return state - action.amount;
    return {count:state.count - action.amount}
  }else{
    return state;
  }
}

class Store {
  constructor(update, state) {
    this._update = update;
    this._state = state;
    this._callbacks = [];
  }

  get state(){
    return this._state;
  }

  updateS(action){
    this._state = this._update(this._state, action);
    this._callbacks.forEach(callback => callback());
  }

  subscribe(callback){
    this._callbacks.push(callback);
    //unsubscribe will delete callback which we added earlier
    return () =>this._callbacks = this._callbacks.filter(cb => cb !== callback);

  }
}

const initialState = {count: 0};

const store = new Store(update, initialState);

const incrementAction = {type: 'INCREMENT', amount: 8};
const decrementAction = {type: 'DECREMENT', amount: 2};

//const unsubscribe = store.subscribe(() => console.log('State changed 1', store.state));
store.subscribe(() => console.log('State changed', store.state));
//state = update(state, incrementAction);
//console.log(state);
store.updateS(incrementAction);
//unsubscribe();
//console.log(store.state);

//state = update(state,  decrementAction);
//console.log(state);
store.updateS(decrementAction);
//console.log(store.state);

//state = update(state, {});
//console.log(state);
store.updateS({});
//console.log(store.state);

export default Store;
