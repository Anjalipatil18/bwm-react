import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
// import logo from './logo.svg';

import {Provider} from 'react-redux';

import {Header} from './shared/Header';
import RentalListing from './component/rental/rental-listing/RentalListing';
import RentalDetail from './component/rental/rental-detail/RentalDetail'


import './App.css';

const store=require('./reducers').init();

class App extends Component {
//   constructor(){
//     super();

//     this.state={
//         isRentalList:true
//     }
// }

// navigate(){
//   this.setState({
//     isRentalList:!this.state.isRentalList
//   })
// }

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Header />
        {/* <button onClick={()=>{ this.navigate()} }>NAVIGATE!</button> */}
        <div className='container'>
          <Route exact path="/" render={()=>{return <Redirect to='/rentals' />}}/>
          <Route exact path="/rentals" component={RentalListing}/>
          <Route exact path="/rentals/:id" component={RentalDetail}/>
        </div>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
