import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';


import {Provider} from 'react-redux';

import Header from './component/shared/Header';
import RentalListing from './component/rental/rental-listing/RentalListing';
import RentalDetail from './component/rental/rental-detail/RentalDetail';
import {RentalCreate} from './component/rental/rental-create/RentalCreate';
import RentalSearchListing from './component/rental/rental-listing/RentalSearchListing'
import Login from  './component/login/Login'
import {Register} from  './component/register/Register'

import {RentalManage} from './component/rental/rental-manage/RentalManage';
import BookingManage from './component/booking/booking-manage/BookingManage';
import {ProtectedRoute} from './component/shared/auth/ProtectedRoute';
import {LoggedInRoute} from './component/shared/auth/LoggedInRoute'
import * as actions from './actions';

import './App.css';

const store=require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Header logout={this.logout} />
        <div className='container'>
          <Switch>
              <Route exact path="/" render={()=>{return <Redirect to='/rentals' />}}/>
              <Route exact path="/rentals" component={RentalListing}/>
              <Route exact path="/rentals/:city/homes" component={RentalSearchListing}/>
              <ProtectedRoute exact path="/rentals/manage" component={RentalManage}/>
              <ProtectedRoute exact path="/bookings/manage" component={BookingManage}/>
              <ProtectedRoute exact path="/rentals/new" component={RentalCreate}/>
              <Route exact path="/rentals/:id" component={RentalDetail}/>
              <Route exact path="/login" component={Login}/>
              <LoggedInRoute exact path="/register" component={Register}/>
          </Switch>

        </div>
      </div>
      </BrowserRouter>
      </Provider>
     
    );
  }
}

export default App;
