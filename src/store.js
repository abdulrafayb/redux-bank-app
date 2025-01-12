/* import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension'; */
import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

/* const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); */

const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});

export default store;

/* store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());
store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());
store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'Buy a car' },
});
console.log(store.getState());
store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
we are gonna write the same code below again but with action creators */

/* store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, 'Buy a cheap car'));
console.log(store.getState());
store.dispatch(payloan());
console.log(store.getState()); */

/* store.dispatch(createCustomer('Max Mustermann', '123456789'));
console.log(store.getState());
store.dispatch(updateName('Max Mustermann Jr.'));
console.log(store.getState()); */

/* we specially created a store.js file so we can write our pure redux code into it so that we can learn and understand it in isolation without react so we are gonna model a bank account without an account number and it will only include balance loan loan purpose and just like useReducer we start by creating some initial state object with reducer function which receives a state and action */

/* the goal of the reducer is to calculate the new state based on the current and on the received action and its also important to remember that reducers are not allowed to modify the existing state and they are also not allowed to do any asynchronous logic or other side effects so instead what we should do with reducers is to place as much logic as possible inside of them */

/* one thing that is actually different between the redux reducer function and the useReducer reducer function is that usually we directly pass in the initialState as the default state just as where we specify a default parameter in case there is none set */

/* the actions that are going to be dispatched to the above reducer or actually to the redux store they will again have the shape of a type and a payload meaning our above reducer function will look exactly the same way as we have used in useReducer hook that is why redux is much easier to learn once you have learnt useReducer hook */

/* back in the day action types used to be written all uppercase like 'SET_BALANCE/DEPOSIT_ACCOUNT' so if we check out older redux code bases then we will see the action type written like this but nowadays the reduc team advises to write these action names in a different way meaning these action names should model what happens so we write them in the shape of the state domain which is account in our case then the event name */

/* in the default case we do it differently in redux as before we would usually throw some an error however in redux it is advised not to do that for some reason and instead simply return the original state meaning in case the reducer function receives an action that it doesn't know about it will simply return the original state back meaning the state won't be update but there also won't be an error */

/* now we create a redux store which is an actual redux feature so before we simply created an object and a function meaning we didn't really used redux so now to use it we have to first install it and out of the redux package we will take the create store method in order to create a store which we see above has a strike through and the reason is that the redux team have declared that this method is deprecated as there is now a more modern way of writing redux which is redux toolkit but first we are gonna learn redux the older way then we can transition into redux toolkit because otherwise everything will really just seem like magic as it works just too easily and then we will have no idea about what is going on */

/* to create our store all we have to do is to call the create store function with the reducer which will then return the store so we save it in a variable which we have named store and now on this store we can dispatch actions passing in events and we already know about the dispatch function useReducer hook */

/* now to execute this file and see the results we import this file in our index.js file as we already know that file will always be executed at the very beginning and then it will run the code that we have above */

/* we can also subscribe to the store which would then automatically show us these updates on the console but we are gonna keep it simple because in real applications we will not need it and now for the very first time we will actually pass in another object because then we can pass in basically multiple pieces of data */

/* now we are gonna add some more redux conventions on top of the code we have as in redux we don't always manually write the type like we have above but instead we create something called an action creator to automate this process and action creators are simply functions that return actions meaning they are really not a redux thing as redux would work perfectly fine without them but they are a useful convention that redux developers have used forever so we are going to create one action creator for each possible action and when we use action creators our code looks a lot nicer and it is especially a lot more reusable than always writing the object by hand as that might create a problem that we write something wrong or maybe a typo or we don't remember the right string which can then introduce bugs */

/* back in the day react developers also used to place the strings of the type into separate variables into a separate file like 
const ACCOUNT_DEPOSIT = 'account/deposit'
then we would also have the action type name strings in one central place without having to manually write it so we may find this in older code bases however in modern react that is no longer used */

/* we can also compute the current date inside the reducer but that would actually be a side effect and we shouldn't have side effects in the reducer function so we do it inside the creater function and usually we should in fact keep as much business logic as possible inside the reducer but since this is actually a side effect this does not belong in the reducer */

/* now that we have two reducers we need to place both of them inside the store so remember how we learned earlier that in redux we don't dispatch actions directly to the reducer but really to the store such as 'store.dispatch' which is going to stay the same now as we have a new reducer and basically some more state and now we can't simply pass that other reducer in the store but instead what we need to do is to combine all the reducers that we have in order to create one so-called root reducer because this reducer that creates store receives is always considered the root reducer so before it was just one but again usually what we always do is to combine all the reducers that we have */

/* redux is smart enough to know that which action belongs to which reducer and it has nothing to do with the fact that we have specified those actions in types it is really just a convention that we followed but we could give it any name that we wanted which is only there for us developers so that we understand what we are actually doing but react only uses the rootReducer information that we give it then it internally figures out which type belongs to which reducer */

/* all of this does not make a lot of sense meaning real world sense as customers and accounts should ofcourse be somehow connected with some account number or so but that doesn't matter here because here we only want to understand how redux works */
