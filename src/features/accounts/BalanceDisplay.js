import { connect } from 'react-redux';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className='balance'>{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);

/* here we do it the old way meaning before the react hooks existed of connecting react components to the redux store so the useSelector and useDispatch hooks that we have used up until this point are the modern way of using redux in react so before hooks existed we had to use the "ConnectAPI" and we will see this API in older code bases so we are gonna use this old ConnectAPI in this component */

/* the way we usually used that API was simply with the connect function so besides exporting those hooks that we have been using the react-redux library also exports that connect function and this connect function takes in another function "usually called mapStateToProps" which then in turn will return a new function which will then accept our component as a new argument */

/* mapStateToProps function receives the state object from the store and then all we have to do is to return an object in which we can define the name of a prop that our component should receive so above we could also take the entire state or just the account but all we want is really the balance and then we pass this function into connect */

/* now what's gonna happen then is the connect function will return a new function so it will then become a function and the balance display component will then be the argument of that new function and so that new function is basically a new component and that new component will have the balance prop which is "BalanceDisplay" so we defined it as balance in mapStateToProps and so then that's the name of the prop and so therefore mapStateToProps is the name of the function that we pass into connect because we defined it as mapStateToProp and so what it does is to map some state from our store to a prop so a prop in our BalanceDisplay component which then we can use to display the balance */

/* it's not really important to understand how this works because we will not use this on our own this is just so that when we this in the wild atleast then we will know what this does so before we had hooks this is the way we needed to do it because there was no other way of getting the state somehow into the component */
