import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class Map extends Component {

    constructor(props){
        
        super(props);

        this.state = {};

        this.refreshMarkerOnMap = this.refreshMarkerOnMap.bind(this);
        this.checkMapVisibility = this.checkMapVisibility.bind(this);
    }

    checkMapVisibility() {
        if (!this.state.mapObject) {
            this.state.mapObject = new GMaps({
                el: '#googleMap',
                lat: 0,
                lng: 0
            });
        }
    }

    componentDidUpdate() {
        this.refreshMarkerOnMap();
    }

    refreshMarkerOnMap() {        

        this.checkMapVisibility();

        const map = this.state.mapObject;
        const markers = this.props.mapMarkers;

        map.removeMarkers();

        if(markers && !_.isEmpty(markers)){

            _.map(markers, mk => {
                map.addMarker({
                    lat: mk.lat,
                    lng: mk.long 
                });
            });         

            map.fitZoom();
        }
    }


    render(){
        return(
        
        <div className="mapWrapper">
        <div className="map" id="googleMap"></div>
        </div>
        

    )}
}


Map.propTypes = {
    mapMarkers: PropTypes.array
};

export default connect(
    state => ({ 
        mapMarkers: state.mapMarkers
    }),
    dispatch => ({
       
    }), null, {
        withRef: true
    }
)(Map);