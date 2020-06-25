import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';

import {Provider} from 'react-redux';

import Header from './component/shared/Header';
import RentalListing from './component/rental/rental-listing/RentalListing';
import RentalDetail from './component/rental/rental-detail/RentalDetail'
import Login from  './component/login/Login'
import {Register} from  './component/register/Register'

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
          <Route exact path="/" render={()=>{return <Redirect to='/rentals' />}}/>
          <Route exact path="/rentals" component={RentalListing}/>
          <ProtectedRoute exact path="/rentals/:id" component={RentalDetail}/>
          <Route exact path="/login" component={Login}/>
          <LoggedInRoute exact path="/register" component={Register}/>

        </div>
      </div>
      </BrowserRouter>
      </Provider>
     
    );
  }
}

export default App;
