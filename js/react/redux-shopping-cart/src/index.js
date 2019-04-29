// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import { createStore, combineReducers } from 'redux';

function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: {
      product, quantity, unitCost,
    }
  }
}


const ADD_TO_CART = 'ADD_TO_CART';



const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90,
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47,
    }
  ]
}




const productsReducer = function(state = initialState, action) {
  return state;
}

const cartReducer = function(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    default:
      return state
  }
}

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer,
}

const rootReducer = combineReducers(allReducers);
const store = createStore(rootReducer);
console.log("initial state", store.getState());

let unsubscribe = store.subscribe(()=> {
  console.log('发生变化了')
  console.log(store.getState());
});



store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L',1, 250));

// unsubscribe();



// 创建一个store，并且在store对象上注册观察器。观察者模式,当 view层dispatch action的时候， reducer监听到，然后执行逻辑，更改state, 更改完，再通知
// 注册的listener
