import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, loanPurpose) {
        return {
          payload: { amount, loanPurpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// console.log(accountSlice);
export const { /* deposit */ withdraw, requestLoan, payLoan } =
  accountSlice.actions;
// console.log(requestLoan(1000, 'To buy a car'));

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export default accountSlice.reducer;

/* now in order to create thunk in redux toolkit we can use the createAsyncThunk function that redux toolkit provides us however using that function is a lot of extra work when the easier solution is to simply use the action creator function that we already created and used before so we are gonna reuse it the only thing that we need to do is no longer export the action creator that we automatically get that is commented out above but we are gonna use our own deposit like we have above making sure that it has exact same name as the slice slash name as the reducer meaning it is important that it follows the convention "sliceName/reducerName" and we will do the redux toolkit way of doing thunk in a future project and also thunk is provided in redux toolkit out of the box so we don't have to install it like we did before */

/* export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    case 'account/convertingCurrency':
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: 'account/payLoan' };
} */
