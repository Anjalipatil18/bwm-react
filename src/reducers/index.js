import { rentalReducer ,selectedRentalReducer} from './rental-reducer';
import { createStore, applyMiddleware, compose ,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { userBookingsReducer } from './booking-reducer';

import {reducer as formReducer} from 'redux-form';
import { authReducer } from './auth-reducers';


export const init=()=>{
    const reducer = combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer,
        form:formReducer,
        auth:authReducer,
        userBookings: userBookingsReducer
    });
    
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

    return store;
}