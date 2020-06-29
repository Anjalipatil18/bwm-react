import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';


import {FETCH_RENTAL_BY_ID_SUCCESS,
        FETCH_RENTAL_BY_ID_INIT,
        FETCH_RENTALS_SUCCESS,
        LOGIN_SUCCESS,
        LOGIN_FAILURE,
        LOGOUT
        } from './types';
import { Booking } from '../component/booking/Booking';

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit=()=>{
    return {
        type:FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess=(rental)=>{
    return{
        type:FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}

const fetchRentalsSuccess=(rentals)=>{
    return{
        type:FETCH_RENTALS_SUCCESS,
        rentals
    }
}

export const fetchRentals=()=>{
    return dispatch=>{

      axiosInstance.get('http://localhost:3001/api/v1/rentals')
        .then(res=>res.data)
        .then(rentals=>dispatch(fetchRentalsSuccess(rentals)))
        
    }
   
}

export const fetchRentalById=(rentalId)=>{

    return function(dispatch){
        dispatch(fetchRentalByIdInit());

        axios.get(`http://localhost:3001/api/v1/rentals/${rentalId}`)
        .then(res=>res.data)
        .then(rental=>dispatch(fetchRentalByIdSuccess(rental)))
    }
}


// AUTH ACTIONS.....................

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const register = (userData) => {
    return axios.post('http://localhost:3001/api/v1/users/register', userData).then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
  }

  export const checkAuthState = () => {
    return dispatch => {
      if (authService.isAuthenticated()) {
        dispatch(loginSuccess());
      }
    }
  }

  export const login = (userData) => {
    return dispatch => {
      return axios.post('http://localhost:3001/api/v1/users/auth', userData)
        .then(res => res.data)
        .then(token => {
          authService.saveToken(token);
          dispatch(loginSuccess());
        })
        .catch(({response}) => {
          dispatch(loginFailure(response.data.errors));
        })
    }
  }

  export const logout = () => {
    authService.invalidateUser();
  
    return {
      type: LOGOUT
    }
  }

export const createBooking=(booking)=>{
  return axiosInstance.post('http://localhost:3001/api/v1/bookings',booking)
  .then(res=>res.data)
  .catch(({response})=>Promise.reject(response.data.errors));
}