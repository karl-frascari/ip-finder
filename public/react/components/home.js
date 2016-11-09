import React, {
    Component,
    PropTypes
} from 'react';
import {connect, Provider} from 'react-redux';
import Message from 'react-crouton';
import http from '../helpers/http';
import commonHelpers from '../helpers/common';
import Map from './map';
import store from '../store';
import * as actions from '../actions';
import _ from 'lodash';

const ipApiFinderUrl = 'http://ip-api.com/json/';

class Home extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            urlInput: "",
            toastMessage: {},
            requestIpResponse: {},
            selectedPositions: []            
        }

        this.getUrlLocation = this.getUrlLocation.bind(this);
        this.urlInputChanged = this.urlInputChanged.bind(this);
        this.showToastMessage = this.showToastMessage.bind(this);
        this.clearSelfLocation = this.clearSelfLocation.bind(this);
        this.showHelpMessage = this.showHelpMessage.bind(this);

    }
    clearSelfLocation(){

        const {setMapMarkers, selectedPositions} = this.props;
        
        let positions = selectedPositions;

        positions = _.filter(positions, p => p.type !== 'self');

        setMapMarkers(positions);
    }

    showHelpMessage(obj){

        const {requestIpResponse} = this.state;
        
        const now = new Date();

		const message = "This is your " + obj  + " from ISP " + requestIpResponse.isp + " at " + now;

        this.showToastMessage( message, 'info', 6000);
       
    }

    getUrlLocation(selfLocation, test) {

        const {setMapMarkers, selectedPositions} = this.props;

        let {
            urlInput            
        } = this.state;

        //commonHelpers.applyRegexFromString(/.*?:\/\//g,urlInput);

        const sanitizedUrl = selfLocation ? "" : urlInput;            

        if (selfLocation || commonHelpers.validateUrl(sanitizedUrl)) {

            http.get(ipApiFinderUrl + sanitizedUrl, {}, {}).then(data => {

                this.setState({requestIpResponse: data})                
                
                if(data.status === 'fail'){
                
                    this.showToastMessage('There was a problem', 'error', 6000)
                
                }else{
                    
                     selectedPositions.push({
                        type: selfLocation === true ? "self" : "public",
                        lat: data.lat, 
                        long: data.lon
                    });
                    setMapMarkers(selectedPositions);
                }

            }, err => {
                 this.showToastMessage('There was a problem', 'error', 6000);
            });

        } else {
            this.showToastMessage('Invalid URL. Please follow the www.yoursite.com or yoursite.com pattern.', 'error', 6000);
        }
    }

    showToastMessage(message, type, timeout) {
        
        const {toastMessage} = this.state;        

        typeof toastMessage.id === 'undefined' ?
            toastMessage.id = 0:
            toastMessage.id++;            

        this.setState({
            toastMessage:{
                id: toastMessage.id,
                type,
                message,
                timeout
            }
        });
    }

    urlInputChanged(event) {

        const text = event.target.value;
        const {
            urlInput
        } = this.state;

        this.setState({
            urlInput: text
        });
    }   

    render() {

        const {
            urlInput,
            toastMessage,
            requestIpResponse
        } = this.state;

        return (
            <div>
                <div className="fixedHeader" >Geolocation UI test</div>
                <section id="contentHome" className="container">
                    
                    <h4 className="primaryTitle">Estimated location</h4>

                    <table className="table table-striped table-bordered table-hover">
                        <tbody>
                            <tr>
                                <td className="field_name col-md-5">IP</td>
                                <td id="location_query" className="location_value col-md-6">{requestIpResponse.query}</td>
                                 { requestIpResponse.query ? <td  className="col-md-1"><button onClick={() => this.showHelpMessage("IP")} className="help btn btn-xs btn-info">?</button></td> :  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">Country</td>
                                <td id="location_country" className="location_value">{requestIpResponse.country}</td>
                                 { requestIpResponse.query ? <td ><button  onClick={() => this.showHelpMessage("Country")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">Region</td>
                                <td id="location_regionName" className="location_value">{requestIpResponse.regionName}</td>
                                 { requestIpResponse.query ? <td ><button onClick={() => this.showHelpMessage("Region")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">City</td>
                                <td id="location_city" className="location_value">{requestIpResponse.city}</td>
                                 { requestIpResponse.query ? <td ><button onClick={() => this.showHelpMessage("City")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">Time Zone</td>
                                <td id="location_timezone" className="location_value">{requestIpResponse.timezone}</td>
                                 { requestIpResponse.query ? <td ><button onClick={() => this.showHelpMessage("Time Zone")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">Latitude</td>
                                <td id="location_lat" className="location_value">{requestIpResponse.lat}</td>
                                 { requestIpResponse.query ? <td ><button onClick={() => this.showHelpMessage("Latitude")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                            <tr>
                                <td className="field_name">Longitude</td>
                                <td id="location_lon" className="location_value">{requestIpResponse.lon}</td>
                                 { requestIpResponse.query ? <td ><button onClick={() => this.showHelpMessage("Longitude")} className="help btn btn-xs btn-info">?</button></td>:  <td  className="col-md-1"></td>}
                            </tr>
                        </tbody>
                    </table>
                <div className="dashboard row">
                    <div className="actionFormHolder">
                        <div className="row">
                            
                            <div className="col-lg-3 col-sm-12">
                                <h4 className="primaryTitle">Locate yourself</h4>
                                <button id="btnGetMyLocation" onClick={() => this.getUrlLocation(true)} className="btn primaryCustomButton ">Locate me</button>
                            </div>
                            
                            
                            <div className="col-lg-3 col-sm-12">
                                <h4 className="primaryTitle">Reset</h4>
                                <button id="btnResetLocation" onClick={this.clearSelfLocation} className="btn primaryCustomButton">Reset location</button>
                            </div>
                        

                            <div className="col-lg-6 col-sm-12">
                                <h4 className="primaryTitle">Locate a website</h4>
                                <div className="row" id="formGeoLocation">                                
                                    <input id="inputUrl" onChange={this.urlInputChanged} className="defaultInput website col-lg-7 col-sm-12" required value={urlInput} name="inputUrl" />
                                    <button  type="button" className="btn primaryCustomButton col-lg-4 col-sm-12" onClick={() => this.getUrlLocation(false)}>Locate website</button>
                                </div>                                
                            </div>
                        </div>                        
                    </div>                    
                </div>

                <Map></Map>
                  
            </section>
            
            {
                toastMessage.message?
                <Message
                    id={toastMessage.id}
                    type={toastMessage.type}
                    message={toastMessage.message}
                    timeout={toastMessage.timeout}
                    autoMiss={true}>
                </Message>
                :null
            }

        </div>
    )}
}

Home.propTypes = {
    setMapMarkers: PropTypes.func,
    selectedPositions: PropTypes.array
}


const HomeConector = connect(
    state => ({ 
       selectedPositions: state.mapMarkers
    }),
    dispatch => ({
        setMapMarkers: (markers) => {
            dispatch(actions.setMapMarkers(markers));
        }
    }), null, {
        withRef: true
    }
)(Home);


export default HomeConector;
