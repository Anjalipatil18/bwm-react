import axios from 'axios';

import {FETCH_RENTAL_BY_ID_SUCCESS,
        FETCH_RENTAL_BY_ID_INIT,
        FETCH_RENTALS_SUCCESS
       
        } from './types';

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

        axios.get('http://localhost:3001/api/v1/rentals')
        .then(res=>res.data)
        .then((rentals)=>{
            dispatch(fetchRentalsSuccess(rentals))
            // dispatch(fetchRentalByIdSuccess(rentals))
        })
    }
   
}

export const fetchRentalById=(rentalId)=>{

    return function(dispatch){
        dispatch(fetchRentalByIdInit());

        axios.get(`http://localhost:3001/api/v1/rentals/${rentalId}`)
        .then(res=>res.data)
        .then((rental)=>{
            dispatch(fetchRentalByIdSuccess(rental))

        })
    }
}

