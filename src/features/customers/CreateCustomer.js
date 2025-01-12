import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice';

function Customer() {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className='inputs'>
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;

/* here we learn how to dispatch actions to redux store from within react components so before when we wanted to dispatch an action (see in store.js) we called the dispatch method on the redux store (store.dispatch) however that's not how we do it inside react instead we get access to the dispatch function by using the useDispatch hook which is a custom hook provided to us by the react-redux package */
