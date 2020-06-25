import React from 'react';
import {MapWithGeocode} from '../../../component/map/GoogleMap';

export class RentalMap extends React.Component{

    render(){
        const location =  this.props.location;

        return(
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5s5DwpcytujnVzAPhV5YvijSMRN5i_Lc&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />

        )
        
    }

}