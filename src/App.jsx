import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

import Store from './store';
//import logo from './logo.svg';
import './App.css';

import {createStore} from 'redux';
//import {createStore} from './redux';

const initialState = {count: 0};

function reducer(state = {count: 0}, action){
  switch(action.type){
    case 'INCREMENT':
    return {count: state.count + action.amount};
    case 'DECREMENT':
    return {count: state.count - action.amount};
    case 'RESET':
    return {count: 0};
    default:
    return state;
  }
}

//const incrementAction = {type: 'INCREMENT', amount: 1};
//const decrementAction = {type: 'DECREMENT', amount: 1};
//const resetAction = {type: 'RESET'};

function ratioUp(amount){
  return {type: 'INCREMENT', amount};
}

function ratioDown(amount){
  return {type: 'DECREMENT', amount};
}

function reset(){
  return {type: 'RESET'};
}

//const store = new Store(update, initialState);
const store = createStore(reducer);
//const store = createStore(reducer, initialState);
class App extends Component {
constructor(props){
  super(props);

//  this.state = {count: 0};

  this.increment = this.increment.bind(this);
  this.decrement = this.decrement.bind(this);
  this.reset = this.reset.bind(this);
}

componentDidMount(){
  store.subscribe(()=> this.forceUpdate());
}

increment(){
let amount = parseInt(this.refs.amount.value||1);

  //store.dispatch(incrementAction);
  store.dispatch(ratioUp(amount))
  //store.updateS(incrementAction);
  //this.setState({count: this.state.count + 1});
}

decrement(){
  let amount = parseInt(this.refs.amount.value||1);

  //store.dispatch(decrementAction);
  //store.dispatch(ratioDown(amount))
  store.dispatch(ratioDown(amount));
  //store.updateS(decrementAction);
  //this.setState({count: this.state.count - 1});
}

reset(){
  store.dispatch(reset());
  //store.updateS(resetAction);
  //this.setState({count: this.state.count - 1});
}

  render() {

    const count = store.getState().count;
    return (
      <div className="App">
        <span className="count" > {count}</span>

        <div className="buttons">
          <button className="btn btn-success" onClick={this.decrement}>-</button>
          <button className="btn btn-primary" onClick={this.reset}>C</button>
          <button className="btn btn-danger" onClick={this.increment}>+</button>
        </div>

        <input type="text" ref="amount" defaultValue = "1"/>
      </div>
    );
  }
}

export default App;
